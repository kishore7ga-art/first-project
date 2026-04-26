import Image from "next/image";
import { ArcGalleryHero } from "@/components/ui/arc-gallery-hero-component";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { Header } from "@/components/ui/header-2";
import { Button as NeonButton } from "@/components/ui/neon-button";
import { CinematicFooter } from "@/components/ui/motion-footer";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import StackFeatureSection from "@/components/ui/stack-feature-section";
import { Component as Testimonials } from "@/components/ui/testimonial";

const galleryImages = [
  "/gallery-jh.png",
  "/gallery-ohgji.png",
  "/gallery-sd.png",
  "/gallery-ss1.png",
  "/gallery-ss2.png",
  "/gallery-ss3.png",
  "/gallery-ss4.png",
  "/gallery-untitled.png",
];

export default function LandingPage() {
  return (
    <div className="relative overflow-x-hidden">
      <Header />

      <main className="relative z-10 min-h-dvh overflow-x-hidden rounded-b-[2rem] bg-[#030303] shadow-[0_40px_120px_rgba(0,0,0,0.45)] pb-20">
        <HeroGeometric
          title1="Build Something"
          title2=" in 5 minutes"
          badge=""
        />

        <StackFeatureSection />
        <ArcGalleryHero images={galleryImages} />
        
        <section className="py-40 text-center">
          <h2 className="text-5xl font-bold text-white md:text-[8rem] tracking-tighter leading-none">Leadership Team</h2>
          <p className="mt-8 text-white/60 text-2xl">The minds behind Zelmora</p>
        </section>
        
        <Testimonials />

        {/* Builder Preview Section */}
        <section className="relative w-full bg-black py-32 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(129,140,248,0.1),transparent_70%)]" />
          
          {/* Subtle Grid */}
          <div className="absolute inset-0 opacity-20" 
               style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

          <div className="relative z-10 mx-auto max-w-7xl px-6">
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-center text-4xl font-black tracking-tighter text-white md:text-[8rem] mb-12 uppercase">Zelmora Builder</h2>
              
              {/* Device Mockup with Glow */}
              <div className="relative w-full max-w-6xl p-2 rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_100px_rgba(129,140,248,0.15)] overflow-hidden aspect-video group">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700" />
                
                {/* Inner Content Border */}
                <div className="w-full h-full rounded-[2rem] bg-zinc-950 border border-white/10 flex items-center justify-center overflow-hidden relative">
                   <video 
                    src="/builder-demo.mp4" 
                    autoPlay 
                    muted 
                    loop 
                    playsInline 
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
                  />
                  
                  {/* Scanline Effect Overlay */}
                  <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
                </div>

                {/* Reflection Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 pointer-events-none" />
              </div>
              
              <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                <div className="p-8 rounded-3xl border border-white/5 bg-white/5 backdrop-blur-sm transition-all hover:bg-white/10">
                  <div className="h-12 w-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center mx-auto mb-6">
                    <svg className="h-6 w-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Instant Draft</h3>
                  <p className="text-zinc-500 text-sm">Generate complete landing page structures in seconds with AI.</p>
                </div>
                <div className="p-8 rounded-3xl border border-white/5 bg-white/5 backdrop-blur-sm transition-all hover:bg-white/10">
                  <div className="h-12 w-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center mx-auto mb-6">
                    <svg className="h-6 w-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Block Market</h3>
                  <p className="text-zinc-500 text-sm">Browse 100+ premium sections crafted by world-class designers.</p>
                </div>
                <div className="p-8 rounded-3xl border border-white/5 bg-white/5 backdrop-blur-sm transition-all hover:bg-white/10">
                  <div className="h-12 w-12 rounded-2xl bg-rose-500/20 flex items-center justify-center mx-auto mb-6">
                    <svg className="h-6 w-6 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Brand DNA</h3>
                  <p className="text-zinc-500 text-sm">Set your colors and fonts once, and see them everywhere instantly.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ContainerScroll
          titleComponent={
            <h1 className="text-4xl font-semibold text-white md:text-7xl">
              See it in action
              <br />
              <span className="mt-4 block text-4xl font-bold leading-none md:text-[8rem] tracking-tighter">
                Zelmora Builder 
              </span>
            </h1>
          }
        >
          <div className="relative h-full w-full rounded-2xl bg-[#f7faff]">
            <Image
              src="/zelmora-showcase.jpeg"
              alt="Zelmora technologies and web development logo"
              fill
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="object-cover"
            />
          </div>
        </ContainerScroll>

        <section
          id="launch"
          className="flex flex-col items-center justify-center gap-6 px-4 py-24 text-center"
        >
          <h2 className="text-5xl font-bold text-white md:text-[8rem] tracking-tighter leading-none">
            Ready to get started?
          </h2>
          <p className="max-w-xl text-lg text-white/60">
            Design, remix, and publish polished pages without changing the builder
            workspace you already have.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <NeonButton variant="solid" size="lg">
              Get Started Free
            </NeonButton>
            <NeonButton variant="ghost" size="lg">
              View Demo
            </NeonButton>
          </div>
        </section>
      </main>

      <CinematicFooter />
    </div>
  );
}
