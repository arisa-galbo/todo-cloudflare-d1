import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getPost } from "./action";
interface Post {
  slug: string;
  title: string;
  markdown: string;
  createdAt: string;
}

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
  const formattedDate = new Date(post.createdAt).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="my-6 border-b-2 text-center text-3xl">{post.title}</h1>
      <article className="prose">
        <p>{post.markdown}</p>
        <p>Created at:{formattedDate}</p>
      </article>
    </main>
  );
}
