import React, { useEffect, useRef } from 'react';

export default function Home() {
    const video1Ref = useRef(null);
    const video2Ref = useRef(null);
    const navRef = useRef(null);

    useEffect(() => {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        // Hero Video Seamless Crossfade
        const video1 = video1Ref.current;
        const video2 = video2Ref.current;
        
        if (!video1 || !video2) return;

        let activeVideo = video1;
        let inactiveVideo = video2;

        const handleCrossfade = () => {
            const fadeThreshold = 1.0; 
            if (activeVideo.duration - activeVideo.currentTime < fadeThreshold) {
                inactiveVideo.currentTime = 0;
                inactiveVideo.play();
                
                activeVideo.classList.replace('opacity-100', 'opacity-0');
                inactiveVideo.classList.replace('opacity-0', 'opacity-100');
                
                [activeVideo, inactiveVideo] = [inactiveVideo, activeVideo];
            }
        };

        video1.addEventListener('timeupdate', handleCrossfade);
        video2.addEventListener('timeupdate', handleCrossfade);

        return () => {
            video1.removeEventListener('timeupdate', handleCrossfade);
            video2.removeEventListener('timeupdate', handleCrossfade);
        };
    }, []);

    useEffect(() => {
        // Navbar Interaction
        const nav = navRef.current;
        let lastScroll = 0;

        const handleScroll = () => {
            const currentScroll = window.scrollY;
            
            if (currentScroll > 100) {
                nav.classList.add('scale-[0.98]', 'top-4');
                if (currentScroll > lastScroll) {
                    // Scrolling down
                    nav.style.transform = 'translate(-50%, -150%)';
                } else {
                    // Scrolling up
                    nav.style.transform = 'translate(-50%, 0)';
                }
            } else {
                nav.classList.remove('scale-[0.98]', 'top-4');
                nav.style.transform = 'translate(-50%, 0)';
            }
            lastScroll = currentScroll;
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="bg-background text-on-background selection:bg-primary selection:text-on-primary">
            {/* Top Navigation Bar */}
            <nav ref={navRef} className="fixed top-8 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-50 transition-all duration-500" id="main-nav">
                <div className="liquid-glass rounded-full flex justify-between items-center px-8 py-3.5 bg-neutral-900/40 border border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                    <span className="font-headline italic text-2xl font-bold text-white tracking-tight">AGENCY</span>
                    <div className="hidden md:flex items-center gap-10">
                        <a className="font-headline text-lg tracking-tight text-white border-b border-white/40 transition-opacity duration-300" href="#work">Work</a>
                        <a className="font-headline text-lg tracking-tight text-white/60 hover:text-white transition-opacity duration-300" href="#philosophy">Philosophy</a>
                        <a className="font-headline text-lg tracking-tight text-white/60 hover:text-white transition-opacity duration-300" href="#services">Services</a>
                        <a className="font-headline text-lg tracking-tight text-white/60 hover:text-white transition-opacity duration-300" href="#about">About</a>
                    </div>
                    <button className="bg-white text-black px-6 py-2 text-xs font-label uppercase font-bold tracking-widest hover:bg-neutral-200 transition-colors duration-200 rounded-sm">
                        Contact Us
                    </button>
                </div>
            </nav>

            {/* SECTION 1: HERO */}
            <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
                <div className="absolute inset-0 z-0">
                    <video ref={video1Ref} autoPlay className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 opacity-100" id="hero-video-1" muted playsInline>
                        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4" type="video/mp4"/>
                    </video>
                    <video ref={video2Ref} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 opacity-0" id="hero-video-2" muted playsInline>
                        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4" type="video/mp4"/>
                    </video>
                </div>
                <div className="absolute inset-0 bg-black/50 z-10"></div>
                <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
                    <h1 className="serif-regular text-7xl md:text-9xl text-white leading-[0.9] tracking-tighter mb-16 animate-fade-in opacity-0">
                        Know it then <span className="serif-italic">all</span>
                    </h1>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 animate-fade-in opacity-0" style={{animationDelay: "0.5s"}}>
                        <div className="liquid-glass rounded-full w-full md:w-[420px] p-1.5 flex items-center bg-white/5">
                            <input className="bg-transparent border-none focus:ring-0 text-white placeholder-white/30 w-full px-6 font-body text-sm" placeholder="Your Email" type="email"/>
                            <button className="bg-white text-black h-11 w-11 flex items-center justify-center rounded-full hover:scale-95 transition-transform">
                                <span className="material-symbols-outlined text-lg">arrow_forward</span>
                            </button>
                        </div>
                        <button className="liquid-glass px-10 py-4.5 rounded-full text-white font-label uppercase tracking-[0.25em] text-[10px] font-bold hover:bg-white/10 transition-colors">
                            The Manifesto
                        </button>
                    </div>
                </div>
            </section>

            {/* SECTION 2: ABOUT */}
            <section className="py-40 md:py-64 bg-background px-6 md:px-24" id="about">
                <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row gap-12 md:gap-32 items-start">
                    <div className="w-16 h-[2px] bg-primary mt-10 opacity-60"></div>
                    <h2 className="serif-italic text-5xl md:text-7xl lg:text-8xl leading-[1.1] text-white max-w-5xl reveal-up">
                        Pioneering then ideas for minds that then create, build, and inspire.
                    </h2>
                </div>
            </section>

            {/* SECTION 3: FEATURED VIDEO */}
            <section className="relative h-[85vh] w-full bg-surface-container-lowest overflow-hidden">
                <video autoPlay className="absolute inset-0 w-full h-full object-cover" loop muted playsInline>
                    <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4" type="video/mp4"/>
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-black/20 to-transparent"></div>
                <div className="absolute bottom-20 left-6 md:left-24 z-30">
                    <div className="liquid-glass p-10 md:p-14 max-w-lg rounded-sm">
                        <p className="font-label uppercase tracking-[0.3em] text-[10px] text-white/50 mb-6 font-bold">Curated Narrative</p>
                        <h3 className="serif-regular text-4xl md:text-5xl text-white mb-10 leading-tight">The visual language of unspoken ambition.</h3>
                        <button className="group flex items-center gap-6 text-white hover:text-white/80 transition-colors">
                            <span className="font-label uppercase tracking-[0.2em] text-[10px] font-bold">Explore more</span>
                            <div className="w-16 h-[1px] bg-white/30 group-hover:w-24 transition-all duration-500"></div>
                        </button>
                    </div>
                </div>
            </section>

            {/* SECTION 4: PHILOSOPHY */}
            <section className="py-40 md:py-60 bg-background px-6 md:px-24 overflow-hidden" id="philosophy">
                <div className="max-w-screen-2xl mx-auto">
                    <h2 className="serif-regular text-6xl md:text-9xl text-white mb-32 reveal-up tracking-tighter">Innovation then <span className="serif-italic">x</span> Vision</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <div className="relative aspect-square overflow-hidden rounded-sm liquid-glass reveal-up">
                            <video autoPlay className="absolute inset-0 w-full h-full object-cover scale-105" loop muted playsInline>
                                <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4" type="video/mp4"/>
                            </video>
                        </div>
                        <div className="space-y-24">
                            <div className="reveal-up" style={{transitionDelay: "200ms"}}>
                                <span className="font-label text-[10px] font-bold tracking-[0.3em] text-white/40 block mb-8">01 / CONCEPTUAL</span>
                                <p className="serif-regular text-3xl md:text-4xl text-white leading-relaxed">
                                    We don't just build frameworks; we sculpt experiences that exist at the intersection of ethereal beauty and functional absolute.
                                </p>
                            </div>
                            <div className="w-full h-px bg-white/10"></div>
                            <div className="reveal-up" style={{transitionDelay: "400ms"}}>
                                <span className="font-label text-[10px] font-bold tracking-[0.3em] text-white/40 block mb-8">02 / EXECUTION</span>
                                <p className="serif-regular text-3xl md:text-4xl text-white leading-relaxed">
                                    Every pixel is a conscious decision. Every movement is a calculated breath. We deliver clarity in an age of noise.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 5: SERVICES */}
            <section className="py-40 md:py-60 bg-neutral-950 px-6" id="services">
                <div className="max-w-screen-xl mx-auto">
                    <div className="mb-32 flex flex-col md:flex-row justify-between items-baseline gap-8">
                        <h2 className="serif-regular text-6xl md:text-8xl text-white tracking-tighter">Our focus</h2>
                        <div className="w-full md:w-1/3 h-[1px] bg-white/10 mb-4"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Service Card 1 */}
                        <div className="liquid-glass group cursor-pointer rounded-sm overflow-hidden reveal-up">
                            <div className="relative h-[600px] overflow-hidden">
                                <video autoPlay className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" loop muted playsInline>
                                    <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4" type="video/mp4"/>
                                </video>
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-700"></div>
                                <div className="absolute inset-0 flex flex-col justify-end p-12">
                                    <h4 className="serif-regular text-4xl md:text-5xl text-white mb-6">Digital Architecture</h4>
                                    <p className="font-body text-white/60 max-w-sm text-lg font-light leading-relaxed">Designing immersive ecosystems that define the future of high-end interaction.</p>
                                </div>
                            </div>
                        </div>
                        {/* Service Card 2 */}
                        <div className="liquid-glass group cursor-pointer rounded-sm overflow-hidden reveal-up" style={{transitionDelay: "200ms"}}>
                            <div className="relative h-[600px] overflow-hidden">
                                <video autoPlay className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" loop muted playsInline>
                                    <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4" type="video/mp4"/>
                                </video>
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-700"></div>
                                <div className="absolute inset-0 flex flex-col justify-end p-12">
                                    <h4 className="serif-regular text-4xl md:text-5xl text-white mb-6">Brand Cinema</h4>
                                    <p className="font-body text-white/60 max-w-sm text-lg font-light leading-relaxed">Motion that tells stories before a single word is ever typed or spoken.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-background border-t border-white/5 py-20 md:py-32">
                <div className="max-w-screen-2xl mx-auto px-12 flex flex-col md:flex-row justify-between items-center gap-16">
                    <div className="flex flex-col items-center md:items-start gap-6">
                        <span className="font-headline text-4xl text-white italic">AGENCY</span>
                        <p className="font-body uppercase tracking-[0.2em] text-[10px] text-white/40 font-bold">© 2024 Agency. All Rights Reserved.</p>
                    </div>
                    <div className="flex gap-16">
                        <a className="font-body uppercase tracking-[0.2em] text-[10px] text-white/40 hover:text-white transition-colors font-bold" href="#">Instagram</a>
                        <a className="font-body uppercase tracking-[0.2em] text-[10px] text-white/40 hover:text-white transition-colors font-bold" href="#">LinkedIn</a>
                        <a className="font-body uppercase tracking-[0.2em] text-[10px] text-white/40 hover:text-white transition-colors font-bold" href="#">Vimeo</a>
                    </div>
                    <button className="liquid-glass px-12 py-5 rounded-full text-white font-label uppercase tracking-[0.3em] text-[9px] font-bold hover:bg-white/5 transition-all" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
                        Back to Top
                    </button>
                </div>
            </footer>
        </div>
    );
}
