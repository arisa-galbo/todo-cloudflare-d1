import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData, redirect } from "@remix-run/react";
import type { ActionFunctionArgs } from "@remix-run/cloudflare";
import { getPost, updatePost, deletePost } from "./action";
import "../styles/admin.css";
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
  const formattedDate = new Date(post.createdAt).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
  return (
    <Form method="post" className="form-container">
      <p>
        <label>Title:</label>
        <input type="text" name="title" defaultValue={post.title} />
      </p>
      <p>
        <label>Markdown:</label>
        <br></br>
        <textarea name="markdown" defaultValue={post.markdown} rows={20} />
      </p>
      <p>Created at:{formattedDate}</p>
      <p className="button-group">
        <button
          type="submit"
          name="intent"
          value="update"
          className="update-button"
        >
          update
        </button>
        <br></br>
        <button
          type="submit"
          name="intent"
          value="delete"
          className="delete-button"
        >
          delete
        </button>
      </p>
    </Form>
  );
}
