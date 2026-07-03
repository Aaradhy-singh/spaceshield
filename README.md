# 🛡️ SpaceShield — Space & Defence Intelligence Dashboard

SpaceShield is a premium, real-time intelligence aggregator and database designed to track aerospace and defence developments. The platform merges live telemetry, launch feeds, and AI-driven semantic summaries, with a focus on India's aerospace future and global military watchers.

Live site routing includes specialized sections for **Space Intelligence**, **Defence Watch**, and **Connected APIs Status**.

---

## 🌟 Key Features

* **🇮🇳 Indian Space & Defence First**: Prioritized news coverage from ISRO launchpads, naval command commissions, DRDO tests, and national strategic updates.
* **🌍 Global Watch**: Tracks NATO, the Pentagon, international space agency press releases, and astronautical mission events.
* **⚡ Live Breaking Ticker**: A real-time breaking news ticker floating at the bottom of the dashboard containing immediate intelligence updates.
* **🧠 AI-Powered Summaries**: Instantly isolates facts and summarizes complex defense articles using Groq's high-speed inference engine powered by LLaMA 3 models.
* **🎨 Premium Dark Theme**: Beautiful glassmorphic UI using a curated color palette (HSL Tailored, vibrant orange/red accents) with seamless scroll animations and smooth video crossfades.

---

## 🔗 Connected APIs & Data Sources

SpaceShield integrates directly with 5 live endpoints to compile its feeds:

1. **The Guardian API** — Powers the defence intelligence pipelines (DRDO, naval telemetry, global arms contracts).
2. **Spaceflight News API** — Feeds global astronautical launches, space agency press releases, and flight events.
3. **NASA APOD API** — Delivers the daily NASA Astronomy Picture of the Day with deep-space descriptions.
4. **Groq AI Engine** — Generates clean, bullet-pointed semantic summaries of news articles in real time.
5. **GNews API** — Supplemental search vector indexing international defense journals.

---

## 🚀 Getting Started

### 📋 Prerequisites
Make sure you have **Node.js** (v18+) and **npm** installed on your system.

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
Create a `.env` file in the root directory and add your API keys:
```env
VITE_GUARDIAN_KEY=your_guardian_api_key_here
VITE_NASA_KEY=your_nasa_api_key_here
VITE_GNEWS_KEY=your_gnews_api_key_here
VITE_GROQ_KEY=your_groq_api_key_here
```
*(Note: `.env` is ignored by Git to keep your credentials secure).*

### 💻 Running Locally
To start the Vite development server with Hot Module Replacement (HMR):
```bash
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
* **API Inferences**: Groq SDK / Native Fetch APIs

---

## 👥 Creator & Contacts
Created and maintained by **Aaradhy Singh**:
* **GitHub**: [@Aaradhy-singh](https://github.com/Aaradhy-singh)
* **LinkedIn**: [Aaradhy Singh](https://www.linkedin.com/in/aaradhy-singh/)
* **Email**: aaradhysingh12@gmail.com
* **Phone**: +91 9369265531
