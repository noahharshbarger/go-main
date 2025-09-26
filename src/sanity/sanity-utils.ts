import ImageUrlBuilder from "@sanity/image-url";
import { createClient, type QueryParams } from "next-sanity";
import clientConfig from "./config/client-config";
import {
  categoryQuery,
  postQuery,
  postQueryByCategory,
  postQueryBySlug,
  postQueryByTag,
} from "./sanity-query";
import { Blog } from "@/types/blog";
import { integrations } from "../../integrations.config";

export async function sanityFetch<QueryResponse>({
  query,
  qParams,
  tags,
}: {
  query: string;
  qParams?: QueryParams;
  tags: string[];
}): Promise<QueryResponse> {
  if (!integrations?.isSanityEnabled) {
    return {} as QueryResponse;
  }

  const client = createClient(clientConfig);
  return client.fetch<QueryResponse>(query, qParams as any, {
    cache: "force-cache",
    next: { tags },
  });
}

export function imageBuilder(source: string) {
  return ImageUrlBuilder(clientConfig as any).image(source);
}

export async function getPosts() {
  const posts: Blog[] = await sanityFetch({
    query: postQuery,
    tags: ["post"],
  });
  return posts;
}

export async function getCategories() {
  const categories = await sanityFetch({
    query: categoryQuery,
    tags: ["category"],
  });

  return categories;
}

export async function getPostByTag(tag: string) {
  const posts: Blog[] = await sanityFetch({
    query: postQueryByTag,
    qParams: { slug: tag },
    tags: ["post"],
  });
  return posts;
}

export async function getPostsByCategory(category: string) {
  const posts: Blog[] = await sanityFetch({
    query: postQueryByCategory,
    qParams: { category: category },
    tags: ["post"],
  });

  return posts;
}

export async function getPostBySlug(slug: string) {
  const post: Blog = await sanityFetch({
    query: postQueryBySlug,
    qParams: { slug: slug },
    tags: ["post"],
  });
  return post;
}
