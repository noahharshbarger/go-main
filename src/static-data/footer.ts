import { FooterLink } from "@/types/footer";

export const footerLinks: FooterLink[] = [
  {
    id: crypto.randomUUID(),
    title: "Home",
    href: "/",
    external: false
  },
  {
    id: crypto.randomUUID(),
    title: "Products",
    href: "/",
    external: false
  },
  {
    id: crypto.randomUUID(),
    title: "Careers",
    href: "/",
    external: false,
    badge: {
      text: "Hiring"
    }
  },
  {
    id: crypto.randomUUID(),
    title: "Pricing",
    href: "/",
    external: false
  }
];

export const footerLinksTwo: FooterLink[] = [
  {
    id: crypto.randomUUID(),
    title: "Company",
    href: "/",
    external: false
  },
  {
    id: crypto.randomUUID(),
    title: "Press Media",
    href: "/",
    external: false
  },
  {
    id: crypto.randomUUID(),
    title: "Our Blog",
    href: "/blog",
    external: false
  },
  {
    id: crypto.randomUUID(),
    title: "Account",
    href: "/auth/signin",
    external: false
  }
];
