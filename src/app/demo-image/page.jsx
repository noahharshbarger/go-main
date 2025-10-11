import Image from 'next/image';

export default function ImageOptimizationDemo() {
  return (
    <section>
      <h1>Image Optimization Example</h1>
      {/* next/image automatically optimizes, lazy loads, and serves responsive images */}
      <Image
        src="/images/about/image-1.jpg"
        alt="Team working together"
        width={600}
        height={400}
        priority // Loads image ASAP (for above-the-fold images)
      />
      {/* ...existing content... */}
    </section>
  );
}
// Explanation: Use next/image for better performance and automatic optimization.
