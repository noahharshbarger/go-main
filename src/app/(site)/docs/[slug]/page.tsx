import { structuredAlgoliaHtmlData } from "@/app/libs/crawlIndex";
import { getPostBySlug } from "@/app/libs/markdown";
import markdownToHtml from "@/app/libs/markdownToHtml";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const post = getPostBySlug(params.slug, ["title", "author", "content"]);
  const siteName = process.env.SITE_NAME;
  const authorName = process.env.AUTHOR_NAME;

  if (post) {
    return {
      title: `${post.title || "Single Post Page"} | ${siteName}`,
      description: `${post.metadata?.slice(0, 136)}...`,
      author: authorName,

      robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
          index: true,
          follow: false,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
    };
  } else {
    return {
      title: "Not Found",
      description: "No blog article has been found",
    };
  }
}

const DocsPost = async (props: Props) => {
  const { slug } = await props.params;
  const post = getPostBySlug(slug, ["title", "author", "content"]);

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");

  await structuredAlgoliaHtmlData({
    type: "docs",
    title: post?.title,
    htmlString: content,
    pageUrl: `${process.env.SITE_URL}/docs/${slug}`,
    imageURL: "",
  });

  return <article dangerouslySetInnerHTML={{ __html: content }} />;
};

export default DocsPost;
