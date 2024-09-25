import { Form, useActionData } from "@remix-run/react";
import type { ActionFunctionArgs } from "@remix-run/cloudflare";
import { json, redirect } from "@remix-run/react";
import invariant from "tiny-invariant";
import "../styles/admin.css";
import { createPost } from "./action";
import { getSession } from "../services/session.server";

export const action = async ({ request, context }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const markdown = formData.get("markdown") as string;
  const session = await getSession(request.headers.get("cookie"));
  const userId = session.get("user");
  const errors = {
    title: title ? null : "Title is required",
    slug: slug ? null : "Slug is required",
    markdown: markdown ? null : "Markdown is required",
    userId: userId ? null : "You have to login",
  };

  const hasErrors = Object.values(errors).some((errorMessage) => errorMessage);
  if (hasErrors) {
    return json(errors);
  }

  invariant(typeof title === "string", "title must be a string");
  invariant(typeof slug === "string", "slug must be a string");
  invariant(typeof markdown === "string", "markdown must be a string");

  try {
    await createPost(
      { title, slug, markdown, userId },
      context.cloudflare.env["test11-binding"]
    );
  } catch (error) {
    return json(
      { slug: "A post with this slug already exists." },
      { status: 400 }
    );
  }

  return redirect("/posts/admin");
};

const inputClassName =
  "w-full rounded border border-gray-500 px-2 py-1 text-lg";

export default function NewPost() {
  const errors = useActionData<typeof action>();
  return (
    <Form method="post" className="form-container">
      <p>
        <label>
          Post Title:{" "}
          {errors?.title ? (
            <em className="text-red-600">{errors.title}</em>
          ) : null}
          <input type="text" name="title" className={inputClassName} />
        </label>
      </p>
      <p>
        <label>
          Post Slug:{" "}
          {errors?.slug ? <em className="error">{errors.slug}</em> : null}
          <input type="text" name="slug" className={inputClassName} />
        </label>
      </p>
      <p>
        <label htmlFor="markdown">
          Markdown:{" "}
          {errors?.markdown ? (
            <em className="error">{errors.markdown}</em>
          ) : null}
        </label>
        <br />
        <textarea
          id="markdown"
          rows={20}
          name="markdown"
          className={`${inputClassName} font-mono`}
        />
      </p>
      <p className="button-group">
        {errors?.userId ? <em className="error">{errors.userId}</em> : null}
        <button type="submit" className="update-button">
          Create Post
        </button>
      </p>
    </Form>
  );
}
