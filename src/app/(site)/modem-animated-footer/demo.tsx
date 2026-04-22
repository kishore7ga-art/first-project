"use client";

import { Footer } from "@/components/ui/modem-animated-footer";
import {
  AtSign,
  Blocks,
  Globe,
  Mail,
  MessageCircle,
} from "lucide-react";

export default function FooterDemo() {
  const socialLinks = [
    {
      icon: <AtSign className="h-6 w-6" />,
      href: "https://example.com",
      label: "Social",
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      href: "https://example.com/chat",
      label: "Chat",
    },
    {
      icon: <Globe className="h-6 w-6" />,
      href: "https://example.com",
      label: "Website",
    },
    {
      icon: <Mail className="h-6 w-6" />,
      href: "mailto:contact@resumegpt.com",
      label: "Email",
    },
  ];

  const navLinks = [
    { label: "Pricing", href: "/" },
    { label: "Templates", href: "/" },
    { label: "About", href: "/" },
    { label: "Contact", href: "/" },
  ];

  return (
    <Footer
      brandName="ResumeGPT"
      brandDescription="AI-powered resume builder for modern professionals. Create stunning resumes optimized for ATS systems."
      socialLinks={socialLinks}
      navLinks={navLinks}
      creatorName="Deepak Modi"
      creatorUrl="https://deepakmodi.tech"
      brandIcon={
        <Blocks className="h-8 w-8 text-background drop-shadow-lg sm:h-10 sm:w-10 md:h-14 md:w-14" />
      }
    />
  );
}
