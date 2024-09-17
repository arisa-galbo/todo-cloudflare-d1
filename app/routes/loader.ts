import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/node";

export const loader = async ({ context }: LoaderFunctionArgs) => {
  try {
    const [posts, users] = await Promise.all([
      context.db.post.findMany(),
      context.db.users.findMany(),
    ]);
    return json({ posts, users });
  } catch (error) {
    console.error("Failed to load posts and users:", error);
    throw new Response("Internal Server Error", { status: 500 });
  }
};
