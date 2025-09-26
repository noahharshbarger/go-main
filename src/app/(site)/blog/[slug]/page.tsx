import { structuredAlgoliaHtmlData } from "@/app/libs/crawlIndex";
// import BlogComment from "@/components/Blog/BlogDetails/BlogComment";
import RenderBodyContent from "@/components/Blog/BlogDetails/RenderBodyContent";
import { getPostBySlug, imageBuilder } from "@/sanity/sanity-utils";
import { formatDate } from "@/utils/format-date";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const { slug } = params;
  const post = await getPostBySlug(slug);
  const siteURL = process.env.SITE_URL;
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

      openGraph: {
        title: `${post.title} | ${siteName}`,
        description: post.metadata,
        url: `${siteURL}/blog/${post?.slug?.current}`,
        siteName: siteName,
        images: [
          {
            url: post?.mainImage && imageBuilder(post.mainImage).url(),
            width: 1800,
            height: 1600,
            alt: post.title,
          },
        ],
        locale: "en_US",
        type: "article",
      },

      twitter: {
        card: "summary_large_image",
        title: `${post.title} | ${siteName}`,
        description: `${post.metadata?.slice(0, 136)}...`,
        creator: `@${authorName}`,
        site: `@${siteName}`,
        images: post?.mainImage && [imageBuilder(post?.mainImage).url()],
        url: `${siteURL}/blog/${post?.slug?.current}`,
      },
    };
  } else {
    return {
      title: "Not Found",
      description: "No blog article has been found",
    };
  }
}

export default async function BlogSlugPage(props: Props) {
  const params = await props.params;
  const { slug } = params;

  const post = await getPostBySlug(slug);

  if (!post) return notFound();

  await structuredAlgoliaHtmlData({
    type: "blog",
    title: post?.title || "",
    htmlString: post?.metadata || "",
    pageUrl: `${process.env.SITE_URL}/blog/${post?.slug?.current}`,
    imageURL: post?.mainImage && imageBuilder(post?.mainImage).url(),
  });

  return (
    <main className="border-b pb-20 pt-[130px] lg:pb-[130px] dark:border-[#2E333D]">
      <div
        className="relative z-10 bg-cover bg-center bg-no-repeat py-20 lg:py-[120px]"
        style={{
          backgroundImage: `url(${imageBuilder(post?.mainImage || "").url()})`,
        }}
      >
        <div
          className="absolute left-0 top-0 -z-10 h-full w-full bg-cover bg-center opacity-20 mix-blend-overlay"
          style={{ backgroundImage: "url(/images/blog/NoisePatern.svg)" }}
        ></div>
        <div className="absolute left-0 top-0 -z-10 h-full w-full bg-[#EEF1FDEB] dark:bg-[#1D232DD9]"></div>

        <div className="px-4 text-center">
          <h1 className="font-heading text-dark mb-8 text-3xl font-semibold md:text-[44px] md:leading-tight dark:text-white">
            {post?.title}
          </h1>

          <dl className="text-dark-text font-heading flex flex-wrap items-center justify-center gap-10 dark:text-white">
            {post.author?.image && (
              <>
                <dt>
                  <figure className="flex items-center gap-3">
                    <Image
                      src={imageBuilder(post?.author?.image).url()}
                      alt={"Avatar for " + post?.author?.name}
                      className="rounded-full"
                      width={40}
                      height={40}
                    />

                    <figcaption>{post?.author?.name}</figcaption>
                  </figure>
                </dt>
                <dd className="sr-only">Author</dd>
              </>
            )}

            {post.publishedAt && (
              <>
                <dt className="flex items-center gap-3">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    className="fill-current"
                  >
                    <path d="M15.5835 2.75H19.2502C19.4933 2.75 19.7264 2.84657 19.8983 3.01848C20.0703 3.19039 20.1668 3.42355 20.1668 3.66666V18.3333C20.1668 18.5764 20.0703 18.8096 19.8983 18.9815C19.7264 19.1534 19.4933 19.25 19.2502 19.25H2.75016C2.50705 19.25 2.27389 19.1534 2.10198 18.9815C1.93007 18.8096 1.8335 18.5764 1.8335 18.3333V3.66666C1.8335 3.42355 1.93007 3.19039 2.10198 3.01848C2.27389 2.84657 2.50705 2.75 2.75016 2.75H6.41683V0.916664H8.25016V2.75H13.7502V0.916664H15.5835V2.75ZM13.7502 4.58333H8.25016V6.41666H6.41683V4.58333H3.66683V8.25H18.3335V4.58333H15.5835V6.41666H13.7502V4.58333ZM18.3335 10.0833H3.66683V17.4167H18.3335V10.0833Z" />
                  </svg>

                  <time dateTime={post.publishedAt}>
                    {formatDate(post.publishedAt)}
                  </time>
                </dt>
                <dd className="sr-only">Published At</dd>
              </>
            )}

            <dt className="flex items-center gap-3">
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                className="fill-current"
              >
                <path d="M9.9912 1.925L19.0653 3.22209L20.3615 12.2971L11.9355 20.7231C11.7636 20.8949 11.5304 20.9915 11.2874 20.9915C11.0443 20.9915 10.8112 20.8949 10.6393 20.7231L1.56429 11.6481C1.39244 11.4762 1.2959 11.2431 1.2959 11C1.2959 10.7569 1.39244 10.5238 1.56429 10.3519L9.9912 1.925ZM10.6393 3.87017L3.50854 11L11.2874 18.7779L18.4172 11.6481L17.4455 4.84184L10.6393 3.87017ZM12.5826 9.70384C12.2387 9.35983 12.0456 8.8933 12.0457 8.40689C12.0457 8.16604 12.0932 7.92756 12.1854 7.70506C12.2776 7.48256 12.4127 7.2804 12.5831 7.11013C12.7534 6.93985 12.9556 6.8048 13.1782 6.71267C13.4007 6.62054 13.6392 6.57314 13.88 6.57318C14.3664 6.57327 14.8329 6.76658 15.1768 7.11059C15.5207 7.45459 15.7138 7.92112 15.7137 8.40754C15.7136 8.89395 15.5203 9.36041 15.1763 9.70429C14.8323 10.0482 14.3658 10.2413 13.8794 10.2412C13.393 10.2412 12.9265 10.0478 12.5826 9.70384Z" />
              </svg>

              {post.tags?.map((tag, i, tags) => (
                <Link
                  key={tag}
                  href={`/blog/tag/${tag}`}
                  className="hover:text-primary"
                >
                  #{tag}
                  {i !== tags.length - 1 && <span>, </span>}
                </Link>
              ))}
            </dt>
            <dd className="sr-only">Blog Tags</dd>
          </dl>
        </div>
      </div>

      <article className="prose dark:prose-invert mx-auto px-4 pt-20 lg:pt-24">
        <RenderBodyContent post={post} />
      </article>

      {/* <BlogComment /> */}
    </main>
  );
}
