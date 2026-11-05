import React from 'react';

export default function Privacy() {
  return (
    <div style={{ backgroundColor: '#0A0F1E' }} className="min-h-screen p-8 md:p-16 text-white pt-28">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4 border-b border-white/10 pb-4">Privacy Policy</h1>
        <p className="text-lg text-white/90 leading-relaxed">Last Updated: November 5, 2026</p>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">1. Information and Accounts</h2>
          <p className="text-white/90 leading-relaxed">
            SpaceShield does not require an account. The app does not ask visitors to submit personal profile information. If you contact us by email, we receive the information you choose to include.
          </p>
        </section>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">2. News and Summary Requests</h2>
          <p className="text-white/90 leading-relaxed">
            Searches on the Space and Defence pages are sent to The Guardian through our server function. Spaceflight News requests are made directly from your browser to its API. When you request a summary, the selected article text is sent through our server function to Groq. Do not submit private or sensitive text for summarization.
          </p>
        </section>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">3. Service Providers and Request Data</h2>
          <p className="text-white/90 leading-relaxed">
            Vercel hosts the site and server functions. The Guardian, Spaceflight News, and Groq process requests needed to provide the features above. These services may receive technical request information and handle it under their own privacy policies. The site also loads fonts, imagery, and video from third-party providers.
          </p>
        </section>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">4. Cookies and Analytics</h2>
          <p className="text-white/90 leading-relaxed">
            SpaceShield does not currently require account cookies or include an analytics product. Hosting and third-party providers may process connection data as described in their policies.
          </p>
        </section>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">5. Contact</h2>
          <p className="text-white/90 leading-relaxed">
            Questions about this policy can be sent to <span className="text-primary font-bold">aaradhysingh12@gmail.com</span>.
          </p>
        </section>
      </div>
    </div>
  );
}
