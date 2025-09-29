import { FooterLink } from "@/types/footer";

export const footerLinks: FooterLink[] = [
  {
    id: "footer-home",
    title: "Home",
    href: "/",
    external: false
  },
  {
    id: "footer-products",
    title: "Products",
    href: "/",
    external: false
  },
  {
    id: "footer-careers",
    title: "Careers",
    href: "/",
    external: false,
    badge: {
      text: "Hiring"
    }
  },
  {
    id: "footer-pricing",
    title: "Pricing",
    href: "/",
    external: false
  }
];

export const footerLinksTwo: FooterLink[] = [
  {
    id: "footer-company",
    title: "Company",
    href: "/",
    external: false
  },
  {
    id: "footer-press",
    title: "Press Media",
    href: "/",
    external: false
  },
  {
    id: "footer-blog",
    title: "Our Blog",
    href: "/blog",
    external: false
  },
  {
    id: "footer-account",
    title: "Account",
    href: "/auth/signin",
    external: false
  }
];
