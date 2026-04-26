import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import { Header } from "@/components/ui/header-2";
import { CinematicFooter } from "@/components/ui/motion-footer";
import Image from "next/image";

export default function GalleryPage() {
  const galleryItems = [
    {
      title: "Nebula Horizon",
      description: "A deep dive into celestial design, exploring the boundaries of light and shadow in a 3D space. This project focuses on high-contrast gradients and atmospheric depth.",
      src: "/gallery-jh.png",
      category: "Digital Art"
    },
    {
      title: "Cyberpunk Echoes",
      description: "Capturing the vibrant energy of a futuristic neon-lit cityscape. This piece utilizes advanced ray-tracing techniques to simulate complex light reflections.",
      src: "/gallery-ohgji.png",
      category: "Architecture"
    },
    {
      title: "Organic Flow",
      description: "A study of natural curves and fluid dynamics. This design mimics the gentle movement of water and the intricate patterns found in nature.",
      src: "/gallery-sd.png",
      category: "Nature"
    },
    {
      title: "Monolithic Void",
      description: "Exploring minimalism through a single, powerful geometric form. The Monolithic Void challenges the viewer to find meaning in simplicity.",
      src: "/gallery-ss1.png",
      category: "Minimalism"
    },
    {
      title: "Prismatic Shift",
      description: "A vibrant explosion of color and geometry. Prismatic Shift uses complex polygons to create a kaleidoscope of visual energy.",
      src: "/gallery-ss2.png",
      category: "Abstract"
    },
    {
      title: "Temporal Drift",
      description: "Visualizing the flow of time through warped structures and blurred motion. This project experimental with temporal-based rendering.",
      src: "/gallery-ss3.png",
      category: "Conceptual"
    },
    {
      title: "Ethereal Gate",
      description: "A gateway to a different dimension, combining architectural precision with surreal elements to create a sense of wonder.",
      src: "/gallery-ss4.png",
      category: "Surrealism"
    },
    {
      title: "Synthwave Pulse",
      description: "Retro-futuristic vibes meeting modern 3D design. A tribute to the 80s aesthetic reimagined for the contemporary web.",
      src: "/gallery-untitled.png",
      category: "Retro"
    }
  ];

  return (
    <main className="min-h-screen bg-black overflow-x-hidden">
      <Header />
      
      <HeroGeometric 
        badge="Visual Showcase"
        title1="The Infinite"
        title2="Gallery"
      />

      <section className="py-32 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-32">
            {galleryItems.map((item, index) => (
              <div 
                key={index} 
                className="group flex flex-col gap-12"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-[3rem] border border-white/10 bg-white/5 transition-all duration-700 group-hover:scale-[1.02] group-hover:shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
                  <Image 
                    src={item.src} 
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute top-8 left-8">
                    <span className="px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-y-4 group-hover:translate-y-0">
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-6 px-4">
                  <h3 className="text-6xl font-black tracking-tighter text-white group-hover:text-indigo-400 transition-colors duration-500">
                    {item.title}
                  </h3>
                  <p className="text-2xl text-white/40 leading-relaxed font-light max-w-2xl transition-colors duration-500 group-hover:text-white/60">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CinematicFooter />
    </main>
  );
}
