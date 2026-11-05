# 🛡️ SpaceShield — Space & Defence Intelligence Dashboard

SpaceShield is a space and defence news dashboard that combines Guardian and Spaceflight News articles with on-demand summaries of selected articles.

Live site routing includes specialized sections for **Space Intelligence**, **Defence Watch**, and **Connected APIs Status**.

---

## 🌟 Key Features

* **🇮🇳 Indian Space & Defence First**: Prioritized news coverage from ISRO launchpads, naval command commissions, DRDO tests, and national strategic updates.
* **🌍 Global Watch**: Tracks NATO, the Pentagon, international space agency press releases, and astronautical mission events.
* **📰 Headline Ribbon**: A visual ribbon highlighting SpaceShield's space and defence coverage areas.
* **🧠 On-Demand Article Summaries**: Creates concise summaries of selected articles using Groq.
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
Vercel CLI typically serves the local app at [http://localhost:3000](http://localhost:3000); use the URL printed by `vercel dev` if it selects another port.

### 📦 Production Build
`npm run build` creates the frontend bundle. `npm run preview` previews that static bundle only; it does not run the Vercel API functions. Use `vercel dev` to test the full app locally, and deploy through Vercel to run the server functions in production.

The in-memory API rate limit is best-effort because serverless instances do not share memory. Configure Vercel Firewall rate-limit rules for `/api/summarize` and `/api/guardian` for production protection.

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
