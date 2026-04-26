import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import { AnimatedTestimonials } from "@/components/ui/testimonial";
import { Header } from "@/components/ui/header-2";
import { CinematicFooter } from "@/components/ui/motion-footer";

export default function AboutPage() {
  const team = [
    {
      quote:
        "Visionary leadership is about creating a path where none existed. At Zelmora, we're not just building websites; we're architecting the future of digital expression through AI.",
      name: "Maheshwari.P",
      designation: "CEO of Zenix",
      src: "/team/ceo.png",
    },
    {
      quote:
        "Our goal was always to democratize high-end design. With Zelmora, we've created a platform that understands creativity as deeply as a human designer does.",
      name: "Kishore.GA",
      designation: "Founder of Zenix",
      src: "/team/founder1.png",
    },
    {
      quote:
        "Innovation happens at the intersection of simplicity and power. We've spent years refining the Zelmora engine to make complex 3D web design accessible to everyone.",
      name: "Santhosh.M",
      designation: "Founder of Zenix",
      src: "/team/founder2.png",
    },
    {
      quote:
        "Technology should be invisible yet impactful. Our AI stack is designed to handle the heavy lifting, allowing users to focus purely on their creative vision.",
      name: "Akash.K",
      designation: "CTO of Zenix",
      src: "/team/cto.png",
    },
  ];

  return (
    <main className="min-h-screen bg-black overflow-x-hidden">
      <Header />
      
      <HeroGeometric 
        badge="Our Legacy"
        title1="The Minds Behind"
        title2="Zelmora & Zenix"
      />

      <section className="py-32 relative z-10">
        <div className="container mx-auto px-6">
          <h2 className="text-[10rem] font-black tracking-tighter text-white mb-24 leading-none">
            Leadership <br /> Team
          </h2>
          <div className="mt-12">
            <AnimatedTestimonials testimonials={team} autoplay={true} />
          </div>
        </div>
      </section>

      <section className="py-32 relative z-10 border-t border-white/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-24 items-center">
            <div>
              <h3 className="text-6xl font-bold text-white mb-8 tracking-tight">Our Mission</h3>
              <p className="text-2xl text-white/60 leading-relaxed font-light">
                Zelmora was born out of a shared passion for pushing the boundaries of what's possible on the web. 
                Our team at Zenix is dedicated to building tools that empower creators, designers, and entrepreneurs 
                to bring their boldest visions to life without technical constraints.
              </p>
            </div>
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center p-12 overflow-hidden">
              <img src="/logo.png" alt="Zelmora Logo" className="w-full h-full object-contain opacity-20 grayscale brightness-200" />
            </div>
          </div>
        </div>
      </section>

      <CinematicFooter />
    </main>
  );
}
