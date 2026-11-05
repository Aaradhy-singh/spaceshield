# 🛡️ SpaceShield — Space & Defence Intelligence Dashboard

SpaceShield is a space and defence news dashboard that combines Guardian and Spaceflight News articles with on-demand summaries of selected articles.

Live site routing includes specialized sections for **Space Intelligence**, **Defence Watch**, and **Connected APIs Status**.

---

## 🌟 Key Features

* **🇮🇳 Indian Space & Defence First**: Prioritized news coverage from ISRO launchpads, naval command commissions, DRDO tests, and national strategic updates.
* **🌍 Global Watch**: Tracks NATO, the Pentagon, international space agency press releases, and astronautical mission events.
* **📰 Headline Ribbon**: A visual ribbon highlighting SpaceShield's space and defence coverage areas.
* **🧠 AI-Powered Summaries**: Instantly isolates facts and summarizes complex defense articles using Groq's high-speed inference engine powered by LLaMA 3 models.
* **🎨 Premium Dark Theme**: Beautiful glassmorphic UI using a curated color palette (HSL Tailored, vibrant orange/red accents) with seamless scroll animations and smooth video crossfades.

---

## 🔗 Connected APIs & Data Sources

SpaceShield currently integrates these services:

1. **The Guardian API** — Searchable articles used in the space and defence feeds.
2. **Spaceflight News API** — Spaceflight articles shown in the global space feed.
3. **Groq API** — Creates a short summary when a visitor requests one.

---
 
## 🚀 Getting Started

### 📋 Prerequisites
Use **Node.js 22.12+** and **npm**. The locked Vite and React Router versions do not support Node 18.

### ⚙️ Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/Aaradhy-singh/spaceshield.git
   cd spaceshield
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```

### 🔑 Environment Configuration

API credentials are used only by the Vercel server functions. Never prefix secrets with `VITE_`; Vite includes those values in browser code.

For local development, create an ignored `.env.local` file:

```env
GROQ_API_KEY=your_groq_api_key
GUARDIAN_API_KEY=your_guardian_api_key
```

Add the same names as server-side environment variables in Vercel Project Settings. Do not add these values to source control.

### 💻 Running Locally
Install the Vercel CLI once, then run the app and its API functions together:
```bash
npm install -g vercel
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the site.

### 📦 Production Build
To build the application for deployment:
```bash
npm run build
npm run preview
```

---

## 🛠️ Technology Stack
* **Framework**: React 19 (Vite bundle)
* **Styling**: Tailwind CSS & Vanilla CSS (Custom Glassmorphism and animations)
* **Routing**: React Router DOM (Single Page Routing + anchor hashes)
* **API integrations**: Vercel server functions proxy Guardian and Groq requests; Spaceflight News is fetched directly without a secret key.

---

## 👥 Creator & Contacts
Created and maintained by **Aaradhy Singh**:
* **GitHub**: [@Aaradhy-singh](https://github.com/Aaradhy-singh)
* **LinkedIn**: [Aaradhy Singh](https://www.linkedin.com/in/aaradhy-singh/)
* **Email**: aaradhysingh12@gmail.com
* **Phone**: +91 9369265531
