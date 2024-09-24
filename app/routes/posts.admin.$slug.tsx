import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData, redirect } from "@remix-run/react";
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
      <p>Created at:{formattedCreatedAt}</p>
      {formattedUpdatedAt && <p>updated at:{formattedUpdatedAt}</p>}

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
