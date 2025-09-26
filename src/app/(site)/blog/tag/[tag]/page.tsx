import SingleBlog from "@/components/Blog/SingleBlog";
import { getPostByTag } from "@/sanity/sanity-utils";

type Props = {
  params: Promise<{ tag: string }>;
};

const siteName = process.env.SITE_NAME;
const authorName = process.env.AUTHOR_NAME;

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const { tag } = params;

  const formattedTag = tag.charAt(0).toUpperCase() + tag.slice(1);

  if (tag) {
    return {
      title: ` ${formattedTag} | ${siteName}`,
      description: `This is the Tag page for ${siteName}`,
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
      description: "No tag has been found",
    };
  }
}

export default async function TagSlugPage(props: Props) {
  const params = await props.params;
  const { tag } = params;
  const posts = await getPostByTag(tag);

  return (
    <main className="container grid gap-x-8 gap-y-10 pt-[130px] min-[400px]:grid-cols-[repeat(auto-fill,minmax(400px,1fr))]">
      {posts.map((post) => (
        <SingleBlog key={post.slug.current} blog={post} />
      ))}
    </main>
  );
}
