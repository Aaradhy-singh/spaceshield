import React from 'react';

export default function Terms() {
  return (
    <div style={{ backgroundColor: '#0A0F1E' }} className="min-h-screen p-8 md:p-16 text-white pt-28">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4 border-b border-white/10 pb-4">Terms of Use</h1>
        <p className="text-lg text-white/90 leading-relaxed">
          Last Updated: July 3, 2026
        </p>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">1. Agreement to Terms</h2>
          <p className="text-white/95 leading-relaxed">
            By accessing SpaceShield, you agree to comply with and be bound by these Terms of Use. If you do not agree, please do not use the service.
          </p>
        </section>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">2. Use License and Restrictions</h2>
          <p className="text-white/95 leading-relaxed">
            All intelligence feeds and telemetry compiled on SpaceShield are sourced from public domains and third-party APIs. You may use this platform for personal, non-commercial informational purposes only. You must not attempt to disrupt the platform or compromise our integration endpoints.
          </p>
        </section>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">3. Disclaimer of Warranties</h2>
          <p className="text-white/95 leading-relaxed">
            SpaceShield aggregates open-source intelligence feeds in real time. We do not warrant the absolute accuracy, completeness, or timeliness of the information. All content is provided "as is" without warranties of any kind.
          </p>
        </section>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">4. Limitation of Liability</h2>
          <p className="text-white/95 leading-relaxed">
            In no event shall SpaceShield or its operators be held liable for any direct, indirect, or consequential damages arising out of the use or inability to use the platform.
          </p>
        </section>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">5. Modifications to Service</h2>
          <p className="text-white/95 leading-relaxed">
            We reserve the right to modify, suspend, or terminate the platform or any of its connected APIs at any time without notice.
          </p>
        </section>
      </div>
    </div>
  );
}
