import SingleBlog from "@/components/Blog/SingleBlog";
import { getPostsByCategory } from "@/sanity/sanity-utils";

type Props = {
  params: Promise<{ slug: string }>;
};

const siteName = process.env.SITE_NAME;
const authorName = process.env.AUTHOR_NAME;

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const { slug } = params;

  const formattedCategory = slug.charAt(0).toUpperCase() + slug.slice(1);

  if (slug) {
    return {
      title: ` ${formattedCategory} | ${siteName}`,
      description: `This is the Category page for ${siteName}`,
      author: authorName,

      robots: {
        index: false,
        follow: false,
        nocache: true,
      },
    };
  } else {
    return {
      title: "Not Found",
      description: "No category has been found",
    };
  }
}

export default async function CategoryBlogPage(props: Props) {
  const params = await props.params;
  const posts = await getPostsByCategory(params.slug);

  return (
    <main className="container grid gap-x-8 gap-y-10 pt-[130px] min-[400px]:grid-cols-[repeat(auto-fill,minmax(400px,1fr))]">
      {posts.map((post) => (
        <SingleBlog key={post.slug.current} blog={post} />
      ))}
    </main>
  );
}
