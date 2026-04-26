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
  "/img2.png",
  "/img3.png",
  "/img5.png",
  "/img6.png",
  "/img7.png",
  "/img8.png",
  "/img9.png",
];

export default function LandingPage() {
  return (
    <div className="relative overflow-x-hidden">
      <Header />

      <main className="relative z-10 min-h-[120vh] overflow-x-hidden rounded-b-[2rem] bg-[#030303] shadow-[0_40px_120px_rgba(0,0,0,0.45)]">
        <HeroGeometric
          badge="Sections Studio"
          title1="Build Something"
          title2="Three-Dimensional"
        />

        <StackFeatureSection />
        <ArcGalleryHero images={galleryImages} />
        <Testimonials />

        <ContainerScroll
          titleComponent={
            <h1 className="text-4xl font-semibold text-white md:text-5xl">
              See it in action
              <br />
              <span className="mt-1 block text-4xl font-bold leading-none md:text-[6rem]">
                Sections Builder
              </span>
            </h1>
          }
        >
          <Image
            src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1400"
            alt="Sections builder interface preview"
            height={720}
            width={1400}
            className="mx-auto h-full rounded-2xl object-cover object-left-top"
            draggable={false}
            priority
          />
        </ContainerScroll>

        <section
          id="launch"
          className="flex flex-col items-center justify-center gap-6 px-4 py-24 text-center"
        >
          <h2 className="text-4xl font-bold text-white md:text-6xl">
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
