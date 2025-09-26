import SingleBlog from "@/components/Blog/SingleBlog";
import { getPosts } from "@/sanity/sanity-utils";
import { Metadata } from "next";
import { integrations, messages } from "../../../../integrations.config";

const siteName = process.env.SITE_NAME;

export const metadata: Metadata = {
  title: `Blog Page | ${siteName}`,
  description: "This is Blog page for Go Next.js",
  // other metadata
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <section className="pt-[240px]">
        <div className="px-4 xl:container">
          <div className="w-full border-b pb-20 dark:border-[#2E333D]">
            {integrations?.isSanityEnabled ? (
              <div className="grid gap-x-8 gap-y-10 min-[400px]:grid-cols-[repeat(auto-fill,minmax(400px,1fr))]">
                {posts.map((blog) => (
                  <SingleBlog key={blog?.slug.current} blog={blog} />
                ))}
              </div>
            ) : (
              messages?.sanity
            )}
          </div>
        </div>
      </section>
    </>
  );
}
