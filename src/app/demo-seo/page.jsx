import Head from 'next/head';
import Link from 'next/link';

export default function SEOExample() {
  return (
    <>
      <Head>
        <title>Unified Construction and Restoration (UCR)</title>
        <meta name="description" content="Explore how you can achieve solar financial independence with UCR." />
        <meta property="og:title" content="About Us | UCR" />
        <meta property="og:description" content="Learn more about our team and mission." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/demo-seo" />
        <meta property="og:image" content="https://yourdomain.com/images/about/image-1.jpg" />
      </Head>
      <nav style={{ marginBottom: '2rem' }}>
        {/* Navigation for demo purposes */}
        <Link href="/">Home</Link> |{' '}
        <Link href="/demo-image">Image Optimization Demo</Link> |{' '}
        <Link href="/demo-accessibility">Accessibility Demo</Link>
      </nav>
      <main>
        <h1>About Us</h1>
        <section>
          <p>
            Welcome to our Next.js SEO demo page! This page demonstrates how to use the <code>next/head</code> component to set meta tags for search engines and social media.
          </p>
          <ul>
            <li>Custom page title and description</li>
            <li>Open Graph tags for social sharing</li>
            <li>Semantic HTML for better SEO</li>
          </ul>
          <h2>Our Mission</h2>
          <p>
            We help developers learn modern web technologies with hands-on examples and best practices.
          </p>
        </section>
        <section>
          <h2>Meet the Team</h2>
          <ul>
            <li>Jane Doe – Founder</li>
            <li>John Smith – Lead Developer</li>
            <li>Sam Lee – Designer</li>
          </ul>
        </section>
      </main>
    </>
  );
}
// Explanation:
// - <Head> sets SEO and social meta tags for this page only.
// - Navigation links let users explore other demo pages.
// - Semantic HTML (sections, headings, lists) improves SEO and accessibility.
