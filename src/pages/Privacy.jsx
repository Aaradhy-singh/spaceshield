import React from 'react';

export default function Privacy() {
  return (
    <div style={{ backgroundColor: '#0A0F1E' }} className="min-h-screen p-8 md:p-16 text-white pt-28">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4 border-b border-white/10 pb-4">Privacy Policy</h1>
        <p className="text-lg text-white/90 leading-relaxed">
          Last Updated: July 3, 2026
        </p>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">1. Overview</h2>
          <p className="text-white/90 leading-relaxed">
            Welcome to SpaceShield. We are dedicated to providing you with reliable and real-time space and defence intelligence. This Privacy Policy details how we handle information across our platform.
          </p>
        </section>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">2. Information Collection</h2>
          <p className="text-white/90 leading-relaxed">
            SpaceShield is a read-only intelligence aggregator. We do not require account registration, and we do not collect, store, or share any personal identity information from our visitors.
          </p>
        </section>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">3. Third-Party API Integrations</h2>
          <p className="text-white/90 leading-relaxed">
            Our app connects to third-party public APIs to fetch real-time news and data streams (including NASA, The Guardian, GNews, Spaceflight News, and Groq). These services may collect basic telemetry and usage statistics according to their respective privacy terms.
          </p>
        </section>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">4. Cookies and Telemetry</h2>
          <p className="text-white/90 leading-relaxed">
            We do not set tracking cookies or analytical scripts on our platform. Your browsing history on SpaceShield remains fully private and confined to your local browser environment.
          </p>
        </section>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">5. Contact Information</h2>
          <p className="text-white/90 leading-relaxed">
            For questions regarding this policy, you can contact us at <span className="text-primary font-bold">aaradhysingh12@gmail.com</span>.
          </p>
        </section>
      </div>
    </div>
  );
}
