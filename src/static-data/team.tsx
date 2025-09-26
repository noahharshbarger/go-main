import { Team } from "@/types/team";

export const teamData: Team[] = [
  {
    id: crypto.randomUUID(),
    name: "Olivia Andrium",
    designation: "Project Manager",
    image: "/images/hero/image-1.jpg",
    socialLinks: [
      {
        id: crypto.randomUUID(),
        name: "Facebook",
        link: "/"
      },
      {
        id: crypto.randomUUID(),
        name: "Twitter",
        link: "/"
      },
      {
        id: crypto.randomUUID(),
        name: "Linkedin",
        link: "/"
      }
    ]
  },
  {
    id: crypto.randomUUID(),
    name: "Jemse Kemorun",
    designation: "Frontend Developer",
    image: "/images/team/image-2.jpg",
    socialLinks: [
      {
        id: crypto.randomUUID(),
        name: "Facebook",
        link: "/"
      },
      {
        id: crypto.randomUUID(),
        name: "Twitter",
        link: "/"
      },
      {
        id: crypto.randomUUID(),
        name: "Linkedin",
        link: "/"
      }
    ]
  },
  {
    id: crypto.randomUUID(),
    name: "Avi Pestarica",
    designation: "Product Designer",
    image: "/images/testimonial/image-1.jpg",
    socialLinks: [
      {
        id: crypto.randomUUID(),
        name: "Facebook",
        link: "/"
      },
      {
        id: crypto.randomUUID(),
        name: "Twitter",
        link: "/"
      },
      {
        id: crypto.randomUUID(),
        name: "Linkedin",
        link: "/"
      }
    ]
  }
];
