import { NavbarItem } from "@/types/navbar";

export const navbarData: NavbarItem[] = [
  {
    id: "nav-features",
    title: "Features",
    href: "#features",
    external: false
  },
  {
    id: "nav-about",
    title: "About",
    href: "#about",  
    external: false
  },
  {
    id: "nav-portfolio",
    title: "Portfolio", 
    href: "#portfolio",
    external: false
  },
  {
    id: "nav-pricing",
    title: "Pricing",
    href: "#pricing",
    external: false
  },
  {
    id: "nav-pages",
    title: "Pages",
    submenu: [
      {
        id: "nav-home",
        title: "Home",
        href: "/",
        external: false
      },
      {
        id: "nav-docs",
        title: "Docs", 
        href: "/docs",
        external: false
      },
      {
        id: "nav-solar-parts-picker",
        title: "Solar Parts Picker",
        href: "/solar-parts-picker",
        external: false
      },
      {
        id: "nav-teaching",
        title: "Teaching Curriculum",
        href: "/teaching",
        external: false
      },
      {
        id: "nav-support",
        title: "Support",
        href: "/support",
        external: false
      },
      {
        id: "nav-blog",
        title: "Blog",
        href: "/blog",
        external: false
      },
      {
        id: "nav-signin",
        title: "Sign in",
        href: "/sign-in",
        external: false
      },
      {
        id: "nav-signup",
        title: "Sign up",
        href: "/sign-up",
        external: false
      },
      {
        id: "nav-error",
        title: "Error 404",
        href: "/error",
        external: false
      }
    ]
  }
];
