import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getPost } from "./action";
import "../styles/posts.css";

export const loader = async ({ params, context }: LoaderFunctionArgs) => {
  const { slug } = params;

  if (!slug) {
    throw new Response("Post not found", { status: 404 });
  }

  const posts = await context.db.post.findMany();

  const post = await getPost(slug, posts);

  if (!post) {
    throw new Response("Post not found", { status: 404 });
  }

  return json({ post });
};

export default function PostSlug() {
  const { post } = useLoaderData<typeof loader>();
  function formatDate(date: Date): string {
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }
  const createdAtDate = new Date(post.createdAt);
  const formattedCreatedAt = formatDate(createdAtDate);

  const updatedAtDate = new Date(post.updatedAt);
  const formattedUpdatedAt = post.updatedAt ? formatDate(updatedAtDate) : null;

  return (
    <main className="post-box">
      <h1 className="title">{post.title}</h1>
      <article className="post-article">
        <p>{post.markdown}</p>
      </article>
      <p className="date">Created at:{formattedCreatedAt}</p>
      {formattedUpdatedAt && (
        <p className="date">Updated at:{formattedUpdatedAt}</p>
      )}
    </main>
  );
}
