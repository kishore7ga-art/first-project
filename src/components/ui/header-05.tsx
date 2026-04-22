"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Blocks,
  Equal,
  FilePlus2,
  LayoutTemplate,
  Palette,
  PenTool,
  Search as SearchIcon,
  ShoppingBag,
} from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface ChildrenProps {
  children: ReactNode;
}

const NavigationMenu = ({ children }: ChildrenProps) => (
  <nav className="relative z-50 flex items-center justify-center">{children}</nav>
);

const NavigationMenuList = ({ children }: ChildrenProps) => (
  <ul className="flex items-center justify-center space-x-1 list-none">{children}</ul>
);

interface NavigationMenuItemProps extends ChildrenProps {
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const NavigationMenuItem = ({
  children,
  onMouseEnter,
  onMouseLeave,
}: NavigationMenuItemProps) => (
  <li onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
    {children}
  </li>
);

interface NavigationMenuTriggerProps extends ChildrenProps {
  isActive?: boolean;
}

const NavigationMenuTrigger = ({
  children,
  isActive = false,
}: NavigationMenuTriggerProps) => (
  <button
    type="button"
    className={cn(
      "inline-flex h-10 items-center justify-center px-4 py-2 text-xs transition-colors focus:outline-none",
      isActive ? "text-white" : "text-zinc-400 hover:text-white",
    )}
  >
    {children}
  </button>
);

interface NavigationMenuContentProps extends ChildrenProps {
  isOpen?: boolean;
}

const NavigationMenuContent = ({
  children,
  isOpen = false,
}: NavigationMenuContentProps) => {
  return (
    <div
      className={cn(
        "fixed left-0 right-0 top-12 z-40 w-screen border-b border-white/10 bg-[#09090B]/96 backdrop-blur-xl transform transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
        isOpen ? "translate-y-0 opacity-100" : "-translate-y-4 pointer-events-none opacity-0",
      )}
    >
      <div className="mx-auto w-full max-w-7xl px-8 py-12">{children}</div>
    </div>
  );
};

function SearchCommand() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((current) => !current);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <button
        type="button"
        aria-label="Open search"
        onClick={() => setOpen(true)}
        className="inline-flex h-9 w-9 items-center justify-center text-zinc-400 transition hover:text-white"
      >
        <SearchIcon className="h-4 w-4" aria-hidden="true" />
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type to search components, assets, or docs..." />
        <CommandList>
          <CommandEmpty>No matches found.</CommandEmpty>
          <CommandGroup heading="Create">
            <CommandItem>
              <FilePlus2 size={16} className="opacity-60" aria-hidden="true" />
              <span>New project</span>
              <CommandShortcut className="justify-center">⌘N</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <LayoutTemplate size={16} className="opacity-60" aria-hidden="true" />
              <span>New template</span>
              <CommandShortcut className="justify-center">⌘T</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <PenTool size={16} className="opacity-60" aria-hidden="true" />
              <span>Start design</span>
              <CommandShortcut className="justify-center">⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Navigate">
            <CommandItem>
              <ArrowUpRight size={16} className="opacity-60" aria-hidden="true" />
              <span>Go to workspace</span>
            </CommandItem>
            <CommandItem>
              <ArrowUpRight size={16} className="opacity-60" aria-hidden="true" />
              <span>Go to assets</span>
            </CommandItem>
            <CommandItem>
              <ArrowUpRight size={16} className="opacity-60" aria-hidden="true" />
              <span>Go to documentation</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Themes">
            <CommandItem>
              <Palette size={16} className="opacity-60" aria-hidden="true" />
              <span>Switch theme</span>
              <CommandShortcut>⌘⇧T</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

function PhoneMenu() {
  const mainNav = [
    { title: "Products", href: "#" },
    { title: "Services", href: "#" },
    { title: "Company", href: "#" },
    { title: "Resources", href: "#" },
    { title: "Support", href: "#" },
    { title: "Legal", href: "#" },
    { title: "Locations", href: "#" },
    { title: "Contact", href: "#" },
    { title: "Community", href: "#" },
    { title: "Extras", href: "#" },
  ] as const;

  return (
    <nav className="flex flex-col py-6">
      <div className="grid gap-2 border-b border-white/10 px-6 pb-5">
        <Link
          href="/auth/signin"
          className="rounded-lg px-3 py-3 text-sm font-semibold text-zinc-300 transition hover:bg-white/5 hover:text-white"
        >
          Sign In
        </Link>
        <Link
          href="/auth/signup"
          className="rounded-lg bg-white px-3 py-3 text-center text-sm font-bold text-black transition hover:bg-zinc-200"
        >
          Get Started
        </Link>
      </div>
      {mainNav.map((item) => (
        <div key={item.title} className="border-b border-white/10">
          <button
            type="button"
            className="w-full px-6 py-3 text-left text-sm text-white transition-colors hover:bg-white/5"
          >
            {item.title}
          </button>
        </div>
      ))}
    </nav>
  );
}

function Menus() {
  type MenuName =
    | "design"
    | "dev"
    | "learning"
    | "community"
    | "resources"
    | "tools"
    | "services"
    | "company"
    | null;

  const [activeMenu, setActiveMenu] = useState<MenuName>(null);

  const handleMouseEnter = (menuName: MenuName) => setActiveMenu(menuName);
  const handleMouseLeave = () => setActiveMenu(null);

  return (
    <div className="hidden md:block">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem
            onMouseEnter={() => handleMouseEnter("design")}
            onMouseLeave={handleMouseLeave}
          >
            <NavigationMenuTrigger isActive={activeMenu === "design"}>
              Design
            </NavigationMenuTrigger>
            <NavigationMenuContent isOpen={activeMenu === "design"}>
              <ul className="grid grid-cols-1 gap-6 w-full md:grid-cols-5">
                <li>
                  <Link href="#" className="block group">
                    <div className="mb-3 text-xl font-semibold text-zinc-300 transition group-hover:text-white">
                      UI/UX
                    </div>
                  </Link>
                  <Link href="#" className="block group">
                    <div className="mb-3 text-xl font-semibold text-zinc-300 transition group-hover:text-white">
                      Branding
                    </div>
                  </Link>
                  <Link href="#" className="block group">
                    <div className="mb-3 text-xl font-semibold text-zinc-300 transition group-hover:text-white">
                      Prototypes
                    </div>
                  </Link>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem
            onMouseEnter={() => handleMouseEnter("dev")}
            onMouseLeave={handleMouseLeave}
          >
            <NavigationMenuTrigger isActive={activeMenu === "dev"}>
              Development
            </NavigationMenuTrigger>
            <NavigationMenuContent isOpen={activeMenu === "dev"}>
              <ul className="grid grid-cols-1 gap-6 w-full md:grid-cols-5">
                <li>
                  <Link href="#" className="block group">
                    <div className="mb-3 text-xl font-semibold text-zinc-300 transition group-hover:text-white">
                      Frontend
                    </div>
                  </Link>
                  <Link href="#" className="block group">
                    <div className="mb-3 text-xl font-semibold text-zinc-300 transition group-hover:text-white">
                      Backend
                    </div>
                  </Link>
                  <Link href="#" className="block group">
                    <div className="mb-3 text-xl font-semibold text-zinc-300 transition group-hover:text-white">
                      DevOps
                    </div>
                  </Link>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem
            onMouseEnter={() => handleMouseEnter("learning")}
            onMouseLeave={handleMouseLeave}
          >
            <NavigationMenuTrigger isActive={activeMenu === "learning"}>
              Learning
            </NavigationMenuTrigger>
            <NavigationMenuContent isOpen={activeMenu === "learning"}>
              <ul className="grid grid-cols-1 gap-6 w-full md:grid-cols-5">
                <li>
                  <Link href="#" className="block group">
                    <div className="mb-3 text-xl font-semibold text-zinc-300 transition group-hover:text-white">
                      Tutorials
                    </div>
                  </Link>
                  <Link href="#" className="block group">
                    <div className="mb-3 text-xl font-semibold text-zinc-300 transition group-hover:text-white">
                      Courses
                    </div>
                  </Link>
                  <Link href="#" className="block group">
                    <div className="mb-3 text-xl font-semibold text-zinc-300 transition group-hover:text-white">
                      Blogs
                    </div>
                  </Link>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem
            onMouseEnter={() => handleMouseEnter("community")}
            onMouseLeave={handleMouseLeave}
          >
            <NavigationMenuTrigger isActive={activeMenu === "community"}>
              Community
            </NavigationMenuTrigger>
            <NavigationMenuContent isOpen={activeMenu === "community"}>
              <ul className="grid grid-cols-1 gap-6 w-full md:grid-cols-5">
                <li>
                  <Link href="#" className="block group">
                    <div className="mb-3 text-xl font-semibold text-zinc-300 transition group-hover:text-white">
                      Forums
                    </div>
                  </Link>
                  <Link href="#" className="block group">
                    <div className="mb-3 text-xl font-semibold text-zinc-300 transition group-hover:text-white">
                      Discord
                    </div>
                  </Link>
                  <Link href="#" className="block group">
                    <div className="mb-3 text-xl font-semibold text-zinc-300 transition group-hover:text-white">
                      GitHub
                    </div>
                  </Link>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem
            onMouseEnter={() => handleMouseEnter("resources")}
            onMouseLeave={handleMouseLeave}
          >
            <NavigationMenuTrigger isActive={activeMenu === "resources"}>
              Resources
            </NavigationMenuTrigger>
            <NavigationMenuContent isOpen={activeMenu === "resources"}>
              <ul className="grid grid-cols-1 gap-6 w-full md:grid-cols-5">
                <li>
                  <Link href="#" className="block group">
                    <div className="mb-3 text-xl font-semibold text-zinc-300 transition group-hover:text-white">
                      Documentation
                    </div>
                  </Link>
                  <Link href="#" className="block group">
                    <div className="mb-3 text-xl font-semibold text-zinc-300 transition group-hover:text-white">
                      API Reference
                    </div>
                  </Link>
                  <Link href="#" className="block group">
                    <div className="mb-3 text-xl font-semibold text-zinc-300 transition group-hover:text-white">
                      Changelog
                    </div>
                  </Link>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem
            onMouseEnter={() => handleMouseEnter("tools")}
            onMouseLeave={handleMouseLeave}
          >
            <NavigationMenuTrigger isActive={activeMenu === "tools"}>
              Tools
            </NavigationMenuTrigger>
            <NavigationMenuContent isOpen={activeMenu === "tools"}>
              <ul className="grid grid-cols-1 gap-6 w-full md:grid-cols-5">
                <li>
                  <Link href="#" className="block group">
                    <div className="mb-3 text-xl font-semibold text-zinc-300 transition group-hover:text-white">
                      Figma
                    </div>
                  </Link>
                  <Link href="#" className="block group">
                    <div className="mb-3 text-xl font-semibold text-zinc-300 transition group-hover:text-white">
                      Sketch
                    </div>
                  </Link>
                  <Link href="#" className="block group">
                    <div className="mb-3 text-xl font-semibold text-zinc-300 transition group-hover:text-white">
                      Photoshop
                    </div>
                  </Link>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <div className="hidden lg:flex">
            <NavigationMenuItem
              onMouseEnter={() => handleMouseEnter("services")}
              onMouseLeave={handleMouseLeave}
            >
              <NavigationMenuTrigger isActive={activeMenu === "services"}>
                Services
              </NavigationMenuTrigger>
              <NavigationMenuContent isOpen={activeMenu === "services"}>
                <ul className="grid grid-cols-1 gap-6 w-full md:grid-cols-5">
                  <li>
                    <Link href="#" className="block group">
                      <div className="mb-3 text-xl font-semibold text-zinc-300 transition group-hover:text-white">
                        Consulting
                      </div>
                    </Link>
                    <Link href="#" className="block group">
                      <div className="mb-3 text-xl font-semibold text-zinc-300 transition group-hover:text-white">
                        Workshops
                      </div>
                    </Link>
                    <Link href="#" className="block group">
                      <div className="mb-3 text-xl font-semibold text-zinc-300 transition group-hover:text-white">
                        Support
                      </div>
                    </Link>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem
              onMouseEnter={() => handleMouseEnter("company")}
              onMouseLeave={handleMouseLeave}
            >
              <NavigationMenuTrigger isActive={activeMenu === "company"}>
                Company
              </NavigationMenuTrigger>
              <NavigationMenuContent isOpen={activeMenu === "company"}>
                <ul className="grid grid-cols-1 gap-6 w-full md:grid-cols-5">
                  <li>
                    <Link href="#" className="block group">
                      <div className="mb-3 text-xl font-semibold text-zinc-300 transition group-hover:text-white">
                        About Us
                      </div>
                    </Link>
                    <Link href="#" className="block group">
                      <div className="mb-3 text-xl font-semibold text-zinc-300 transition group-hover:text-white">
                        Careers
                      </div>
                    </Link>
                    <Link href="#" className="block group">
                      <div className="mb-3 text-xl font-semibold text-zinc-300 transition group-hover:text-white">
                        Contact
                      </div>
                    </Link>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-[72px] w-full justify-center border-b border-white/10 bg-[#09090B]/80 backdrop-blur-xl">
      <div className="flex w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="home" className="flex items-center gap-3 whitespace-nowrap px-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white text-black">
            <Blocks className="h-5 w-5" />
          </span>
          <span className="text-lg font-black tracking-tight text-white">Sections</span>
        </Link>

        <Menus />

        <div className="flex items-center gap-2">
          <SearchCommand />
          <Link
            href="/marketplace"
            aria-label="Marketplace"
            className="inline-flex h-9 w-9 items-center justify-center text-zinc-400 transition hover:text-white"
          >
            <ShoppingBag className="h-4 w-4" />
          </Link>
          <Link
            href="/auth/signin"
            className="hidden rounded-lg px-4 py-2 text-sm font-semibold text-zinc-300 transition hover:bg-white/5 hover:text-white lg:inline-flex"
          >
            Sign In
          </Link>
          <Link
            href="/auth/signup"
            className="hidden rounded-lg bg-white px-4 py-2 text-sm font-bold text-black transition hover:bg-zinc-200 lg:inline-flex"
          >
            Get Started
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className="inline-flex h-9 w-9 items-center justify-center text-zinc-300 transition hover:text-white lg:hidden"
              >
                <Equal className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] border-l border-white/10 bg-[#09090B]/95 p-0 text-white backdrop-blur-lg"
            >
              <PhoneMenu />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export { Menus, PhoneMenu, SearchCommand as Search };
