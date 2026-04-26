import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import { Header } from "@/components/ui/header-2";
import { CinematicFooter } from "@/components/ui/motion-footer";
import Image from "next/image";

export default function FeaturesPage() {
  const steps = [
    {
      title: "AI-Powered Ideation",
      description: "Transform your vision into a living website in seconds. Our AI engine doesn't just generate text; it builds entire layouts, selects harmonious color palettes, and sources high-fidelity assets based on your prompt.",
      image: "/feature_ai_design_1777204634203.png",
      color: "from-blue-500/20 to-cyan-500/20"
    },
    {
      title: "Intelligent Remixing",
      description: "Bored with a section? Just hit remix. Zelmora's design DNA system allows you to cycle through 200+ unique variants of any section while maintaining your brand identity perfectly.",
      image: "/gallery-sd.png", // Reusing high-quality asset
      color: "from-purple-500/20 to-pink-500/20"
    },
    {
      title: "The Brand Kit System",
      description: "Set your logo, fonts, and colors once. Our system automatically propagates these styles across every single component, ensuring a consistent, professional look without manual tweaking.",
      image: "/gallery-ss1.png", // Reusing high-quality asset
      color: "from-indigo-500/20 to-blue-500/20"
    },
    {
      title: "Infinite Customization",
      description: "Go beyond the basics. Our builder offers granular control over spacing, border radii, and component behavior. Every element is designed to be interactive and responsive by default.",
      image: "/gallery-ss2.png", // Reusing high-quality asset
      color: "from-rose-500/20 to-orange-500/20"
    },
    {
      title: "Instant Global Publishing",
      description: "When you're ready, publish to our global edge network. Your site is automatically optimized for speed, SEO, and accessibility, delivering a flawless experience to users worldwide.",
      image: "/gallery-ss3.png", // Reusing high-quality asset
      color: "from-emerald-500/20 to-teal-500/20"
    }
  ];

  return (
    <main className="min-h-screen bg-black overflow-x-hidden">
      <Header />
      
      <HeroGeometric 
        badge="How it works"
        title1="Experience the"
        title2="Zelmora Flow"
      />

      <section className="relative z-10 py-32">
        <div className="container mx-auto px-6">
          <div className="flex flex-col gap-64">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className={`flex flex-col lg:flex-row items-center gap-24 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className="flex-1 space-y-8">
                  <div className="inline-flex items-center gap-4 px-6 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-bold uppercase tracking-widest text-indigo-400">
                    <span className="h-2 w-2 rounded-full bg-indigo-400 animate-pulse" />
                    Step 0{index + 1}
                  </div>
                  <h2 className="text-6xl md:text-[7rem] font-black tracking-tighter text-white leading-none">
                    {step.title}
                  </h2>
                  <p className="text-2xl text-white/50 leading-relaxed font-light max-w-2xl">
                    {step.description}
                  </p>
                </div>
                
                <div className="flex-1 w-full max-w-3xl">
                  <div className={`relative aspect-square rounded-[4rem] bg-gradient-to-br ${step.color} border border-white/10 p-1 overflow-hidden group shadow-2xl`}>
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-3xl transition-opacity duration-700 group-hover:opacity-0" />
                    <Image 
                      src={step.image} 
                      alt={step.title}
                      fill
                      className="object-cover opacity-80 transition-all duration-1000 group-hover:scale-110 group-hover:opacity-100"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-40 border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-[8rem] font-black tracking-tighter text-white mb-12 leading-none">
            Ready to <br /> Transform?
          </h2>
          <a 
            href="/builder" 
            className="inline-flex items-center justify-center px-12 py-6 rounded-full bg-white text-black text-xl font-bold transition-transform hover:scale-105 active:scale-95"
          >
            Start Building Now
          </a>
        </div>
      </section>

      <CinematicFooter />
    </main>
  );
}
