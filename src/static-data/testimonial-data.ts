import { Testimonial } from "@/types/testimonial";

export const testimonialData: Testimonial[] = [
  {
    id: crypto.randomUUID(),
    name: "Musharof Chy",
    designation: "Founder @ Pimjo",
    image: "/images/testimonial/image-1.jpg",
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce condimentum sapien ac leo cursus dignissim. In ac lectus vel orci accumsan ultricies at in libero accumsan Lorem Ipsum has been the industry's standard"
  },
  {
    id: crypto.randomUUID(),
    name: "Naimur Rahman",
    designation: "Product Designer @ Pimjo",
    image: "/images/testimonial/image-1.jpg",
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce condimentum sapien ac leo cursus dignissim. In ac lectus vel orci accumsan ultricies at in libero accumsan Lorem Ipsum has been the industry's standard"
  },
  {
    id: crypto.randomUUID(),
    name: "Shafiq Hammad",
    designation: "Frontend Developer @ Pimjo",
    image: "/images/testimonial/image-1.jpg",
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce condimentum sapien ac leo cursus dignissim. In ac lectus vel orci accumsan ultricies at in libero accumsan Lorem Ipsum has been the industry's standard"
  }
];
