<div align="center">

# 🔍 TruthLens AI

**AI-Powered Fake News Detection & Credibility Assessment**

[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Gemini](https://img.shields.io/badge/Google_Gemini-API-8E75B2?logo=google-gemini&logoColor=white)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

TruthLens AI helps readers verify the credibility of news articles, social media posts, and online claims using Google Gemini AI and linguistic heuristics.

[Live Demo](#) · [Report Bug](https://github.com/Vishwajit-kamble/Fake-News-Detector/issues) · [Request Feature](https://github.com/Vishwajit-kamble/Fake-News-Detector/issues)

</div>

---

## 🌟 Key Features

- 🧠 **Multi-Model Credibility Analysis**: Uses Google Gemini models with intelligent fallback chains (`gemini-2.5-flash-lite`, `gemini-2.5-flash`, etc.) for fast, accurate fact-checking and reasoning.
- 📊 **Dynamic Credibility Score**: 0–100 credibility metric accompanied by a confidence rating and visual indicator.
- 🔬 **Linguistic Signal Breakdown**:
  - **Sensational Language**: Flags clickbait phrasing and hyperbolic headlines.
  - **Emotional Tone**: Detects sentiment bias and manipulation tactics.
  - **Unsupported Claims**: Identifies factual statements lacking evidence or citations.
  - **Evidence Grounding**: Evaluates references to primary studies, quotes, and verifiable data.
  - **Journalistic Neutrality**: Assesses objectivity and balance in reporting.
- 🎯 **Interactive In-Text Flagging**: Automatically highlights flagged suspicious phrases directly within the analyzed content.
- ⚡ **Zero-Failure Architecture**: Includes a local heuristic engine ensuring seamless evaluations even during network interruptions or API rate limits.
- 🕒 **Analysis History**: Saves past evaluations locally in your browser for easy review.
- 🌓 **Modern Dark / Light Mode**: Beautiful glassmorphic interface powered by Tailwind CSS v4 and Framer Motion.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Visuals**: [React Circular Progressbar](https://github.com/kevinsqi/react-circular-progressbar)
- **AI Engine**: [Google Generative Language API](https://ai.google.dev/)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` or `yarn` / `pnpm`

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Vishwajit-kamble/Fake-News-Detector.git
   cd Fake-News-Detector
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory:
   ```bash
   cp .env.example .env.local
   ```
   Add your Google Gemini API key:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```
   > 💡 Get a free Gemini API key from [Google AI Studio](https://aistudio.google.com/).

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5174](http://localhost:5174) in your browser.

---

## 📁 Project Structure

```text
frontend/
├── public/               # Static assets & favicons
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Navbar.tsx        # Navigation header & theme switcher
│   │   ├── Footer.tsx        # Footer with links & branding
│   │   ├── ResultView.tsx    # Detailed analysis breakdown & report
│   │   └── ThemeProvider.tsx # Dark/Light theme manager
│   ├── lib/
│   │   └── api.ts            # Gemini API client, fallbacks & heuristics
│   ├── pages/
│   │   ├── LandingPage.tsx   # Product landing page & feature highlights
│   │   ├── AnalyzePage.tsx   # Text input, analysis animations & results
│   │   ├── HistoryPage.tsx   # Past article analysis history
│   │   └── AboutPage.tsx     # Project mission & methodology
│   ├── App.tsx               # Route configurations & layout
│   ├── main.tsx              # Application entry point
│   └── index.css             # Tailwind v4 styles & custom utilities
├── .env.example          # Environment variables template
├── vite.config.ts        # Vite configuration & API dev proxy
└── vercel.json           # Vercel deployment SPA routing
```

---

## 📦 Building for Production

To create an optimized production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

### Deployment (Vercel)

This repository includes a `vercel.json` rewrite configuration for seamless Single Page Application (SPA) routing on Vercel:

1. Push your code to GitHub.
2. Import the repository into [Vercel](https://vercel.com/).
3. Add `VITE_GEMINI_API_KEY` under **Project Settings > Environment Variables**.
4. Click **Deploy**!

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
