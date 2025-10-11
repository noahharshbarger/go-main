import { useParams } from 'next/navigation';

export default function BlogPostDemo() {
  const params = useParams();
  const { slug } = params;

  return (
    <article>
      <h1>Blog Post: {slug}</h1>
      {/* Fetch and render blog post content based on slug */}
    </article>
  );
}
// Explanation: Files/folders in /app or /pages become routes. [slug] makes a dynamic route.
