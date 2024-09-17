import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData, redirect } from "@remix-run/react";
import type { ActionFunctionArgs } from "@remix-run/cloudflare";
import { getPost, updatePost, deletePost } from "./action";

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

export const action = async ({
  request,
  params,
  context,
}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const intent = formData.get("intent");
  console.log(formData);

  if (intent === "delete") {
    await deletePost(params.slug, context.cloudflare.env["test11-binding"]);
  } else if (intent === "update") {
    const title = formData.get("title");
    const markdown = formData.get("markdown");
    await updatePost(
      params.slug,
      { title, markdown },
      context.cloudflare.env["test11-binding"]
    );
  }

  const title = formData.get("title");
  const markdown = formData.get("markdown");

  return redirect("/posts/admin");
};

export default function PostAdminSlug() {
  const { post } = useLoaderData();
  return (
    <Form method="post">
      <p>
        <label>Title:</label>
        <input type="text" name="title" defaultValue={post.title} />
      </p>
      <p>
        <label>Markdown:</label>
        <br></br>
        <textarea name="markdown" defaultValue={post.markdown} rows={20} />
      </p>
      <p className="text-right">
        <button
          type="submit"
          name="intent"
          value="update"
          className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
        >
          update
        </button>
        <br></br>
        <button
          type="submit"
          name="intent"
          value="delete"
          className="rounded bg-red-500 py-2 px-4 text-white hover:bg-red-600 focus:bg-red-400 disabled:bg-red-300"
        >
          delete
        </button>
      </p>
    </Form>
  );
}
