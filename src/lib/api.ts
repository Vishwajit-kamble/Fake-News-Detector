export interface AnalyzeRequest {
  content: string;
}

export interface AnalyzeResponse {
  classification: 'likely_credible' | 'potentially_misleading' | 'needs_verification';
  confidence: number;
  credibility_score: number;
  explanation: string;
  signals: {
    sensational_language: 'low' | 'medium' | 'high';
    emotional_language: 'low' | 'medium' | 'high';
    unsupported_claims: 'low' | 'medium' | 'high';
    evidence: 'low' | 'medium' | 'high';
    neutrality: 'low' | 'medium' | 'high';
  };
  key_phrases: string[];
  related_links: string[];
}

// Paste your key in .env.local or set VITE_GEMINI_API_KEY in your hosting dashboard
const HARDCODED_GEMINI_API_KEY: string = "";

export function getGeminiApiKey(): string {
  const envKey = (import.meta as any).env?.VITE_GEMINI_API_KEY as string | undefined;
  if (envKey && typeof envKey === 'string' && envKey.trim().length > 0 && !envKey.includes("YOUR_")) {
    return envKey.trim();
  }
  if (HARDCODED_GEMINI_API_KEY && HARDCODED_GEMINI_API_KEY.trim().length > 0) {
    return HARDCODED_GEMINI_API_KEY.trim();
  }
  return "";
}

function normalizeClassification(val: any): 'likely_credible' | 'potentially_misleading' | 'needs_verification' {
  const str = String(val || '').toLowerCase().replace(/[\s-_]+/g, '_');
  if (str.includes('credible') && !str.includes('not') && !str.includes('unlikely') && !str.includes('misleading')) {
    return 'likely_credible';
  }
  if (str.includes('misleading') || str.includes('fake') || str.includes('false') || str.includes('implausible') || str.includes('unlikely')) {
    return 'potentially_misleading';
  }
  return 'needs_verification';
}

function normalizeSignal(val: any, fallback: 'low' | 'medium' | 'high' = 'medium'): 'low' | 'medium' | 'high' {
  const str = String(val || '').toLowerCase();
  if (str.includes('high')) return 'high';
  if (str.includes('med')) return 'medium';
  if (str.includes('low')) return 'low';
  return fallback;
}

function extractJson(text: string): any {
  let cleaned = text.trim();
  
  // Remove markdown code blocks if present
  const codeBlockMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  if (codeBlockMatch) {
    cleaned = codeBlockMatch[1].trim();
  }

  // Find first { and last }
  const firstBrace = cleaned.indexOf('{');
  const lastBrace = cleaned.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    cleaned = cleaned.slice(firstBrace, lastBrace + 1);
  }

  return JSON.parse(cleaned);
}

// Local heuristic fallback in case the AI API is unreachable or rate-limited
function generateHeuristicAnalysis(content: string): AnalyzeResponse {
  const lower = content.toLowerCase();

  const sensationalKeywords = [
    'shocking', 'miracle', 'cure', 'cures', 'guaranteed', 'secret', 'hidden',
    'won\'t believe', "wont believe", 'conspiracy', 'you will never guess',
    'banned', 'exposed', 'breakthrough', 'unbelievable', 'urgent warning'
  ];

  const credibleKeywords = [
    'study', 'published in', 'researchers from', 'peer-reviewed', 'clinical trial',
    'spokesperson said', 'according to', 'data shows', 'percent', 'reuters', 'associated press'
  ];

  const foundSensational = sensationalKeywords.filter(w => lower.includes(w));
  const foundCredible = credibleKeywords.filter(w => lower.includes(w));

  let credibilityScore = 70;
  if (foundSensational.length > 0) {
    credibilityScore -= foundSensational.length * 20;
  }
  if (foundCredible.length > 0) {
    credibilityScore += foundCredible.length * 10;
  }
  credibilityScore = Math.max(5, Math.min(95, credibilityScore));

  let classification: 'likely_credible' | 'potentially_misleading' | 'needs_verification' = 'needs_verification';
  let explanation = '';

  if (credibilityScore >= 65) {
    classification = 'likely_credible';
    explanation = 'The text uses measured phrasing, objective reporting cues, and lacks typical sensationalized exaggerations.';
  } else if (credibilityScore <= 40) {
    classification = 'potentially_misleading';
    explanation = `The text contains sensational claims and emotional language (such as "${foundSensational.slice(0, 2).join('", "') || 'exaggerated claims'}") with unverified evidence.`;
  } else {
    classification = 'needs_verification';
    explanation = 'The article makes notable claims that require independent verification against primary sources and peer-reviewed data.';
  }

  const keyPhrases = foundSensational.length > 0
    ? foundSensational.slice(0, 5)
    : content.split(/[.,\n]/).map(s => s.trim()).filter(s => s.length > 15 && s.length < 60).slice(0, 3);

  return {
    classification,
    confidence: 0.88,
    credibility_score: credibilityScore,
    explanation,
    signals: {
      sensational_language: foundSensational.length > 1 ? 'high' : foundSensational.length === 1 ? 'medium' : 'low',
      emotional_language: foundSensational.length > 0 ? 'high' : 'low',
      unsupported_claims: credibilityScore < 50 ? 'high' : 'low',
      evidence: foundCredible.length > 0 ? 'high' : 'low',
      neutrality: credibilityScore >= 60 ? 'high' : 'low'
    },
    key_phrases: keyPhrases.length > 0 ? keyPhrases : ['notable claims in text'],
    related_links: []
  };
}

export async function analyzeArticle(data: AnalyzeRequest): Promise<AnalyzeResponse> {
  const apiKey = getGeminiApiKey();

  if (!apiKey) {
    // If no key is provided, use heuristic analysis
    return generateHeuristicAnalysis(data.content);
  }

  const prompt = `
You are an expert news analysis AI. Analyze the following news article for credibility, potential bias, sensationalism, and linguistic patterns.

Content:
${data.content}

Provide your analysis in the exact JSON structure below, with NO markdown formatting, just pure JSON:
{
  "classification": "One of: likely_credible, potentially_misleading, needs_verification",
  "confidence": 0.85,
  "credibility_score": 75,
  "explanation": "A natural-language explanation (1-2 sentences) of why this assessment was made. Focus on language, claims, and evidence.",
  "signals": {
    "sensational_language": "low, medium, or high",
    "emotional_language": "low, medium, or high",
    "unsupported_claims": "low, medium, or high",
    "evidence": "low, medium, or high",
    "neutrality": "low, medium, or high"
  },
  "key_phrases": ["list", "of", "up", "to", "5", "suspicious", "or", "notable", "phrases", "from", "the", "text"],
  "related_links": []
}
`;

  // Models to attempt in order of availability and speed
  const models = ['gemini-2.5-flash-lite', 'gemini-2.5-flash', 'gemini-3.7-flash', 'gemini-3.8-flash'];
  
  // Potential endpoint bases (try Vite proxy first if available to avoid CORS/adblockers, then direct API)
  const isDev = Boolean((import.meta as any).env?.DEV);
  const endpointBases = isDev
    ? ['/api/gemini/v1beta/models', 'https://generativelanguage.googleapis.com/v1beta/models']
    : ['https://generativelanguage.googleapis.com/v1beta/models', '/api/gemini/v1beta/models'];

  let lastError: any = null;

  for (const base of endpointBases) {
    for (const model of models) {
      // First attempt without search tool to avoid 503 high demand issues, then fallback
      const url = `${base}/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: prompt }]
              }
            ]
          }),
        });

        if (!response.ok) {
          const errText = await response.text().catch(() => '');
          lastError = new Error(`Model ${model} returned ${response.status}: ${errText.slice(0, 100)}`);
          continue; // Try next model
        }

        const result = await response.json();
        const parts = result.candidates?.[0]?.content?.parts || [];
        const textPart = parts.find((p: any) => p.text && !p.thought) || parts[0];
        const rawText = textPart?.text;

        if (!rawText) {
          continue;
        }

        const parsed = extractJson(rawText);

        return {
          classification: normalizeClassification(parsed.classification),
          confidence: typeof parsed.confidence === 'number' ? Math.min(1, Math.max(0, parsed.confidence)) : 0.88,
          credibility_score: typeof parsed.credibility_score === 'number' ? Math.min(100, Math.max(0, parsed.credibility_score)) : 70,
          explanation: parsed.explanation || 'Article analysis completed successfully.',
          signals: {
            sensational_language: normalizeSignal(parsed.signals?.sensational_language, 'medium'),
            emotional_language: normalizeSignal(parsed.signals?.emotional_language, 'low'),
            unsupported_claims: normalizeSignal(parsed.signals?.unsupported_claims, 'medium'),
            evidence: normalizeSignal(parsed.signals?.evidence, 'medium'),
            neutrality: normalizeSignal(parsed.signals?.neutrality, 'high'),
          },
          key_phrases: Array.isArray(parsed.key_phrases) ? parsed.key_phrases : [],
          related_links: Array.isArray(parsed.related_links) ? parsed.related_links : [],
        };
      } catch (err: any) {
        lastError = err;
        // Continue to next model/endpoint
      }
    }
  }

  // If all API calls fail (e.g. offline, rate-limited, blocked), gracefully fallback to heuristic analysis
  console.warn("Gemini API connection failed, using heuristic analysis fallback:", lastError);
  return generateHeuristicAnalysis(data.content);
}
