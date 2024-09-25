import { Link, useLoaderData, Outlet } from "@remix-run/react";
import "../styles/admin.css";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/node";
import { getSession } from "~/services/session.server";

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  try {
    const session = await getSession(request.headers.get("cookie"));
    const userId = session.get("user");
    if (!userId) {
      throw new Response("Unauthorized", { status: 401 });
    }

    const [posts, users] = await Promise.all([
      context.db.post.findMany(),
      context.db.users.findMany(),
    ]);

    const userPosts = posts.filter((post) => post.userId === userId);

    const sortedPosts = userPosts.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return json({ posts: sortedPosts, users });
  } catch (error) {
    console.error("Failed to load posts and users:", error);
    throw new Response("Internal Server Error", { status: 500 });
  }
};

export default function PostAdmin() {
  const { posts } = useLoaderData<typeof loader>();
  return (
    <div className="container">
      <h1 className="title">Blog Admin</h1>
      <form action="/logout" method="post">
        <button type="submit" className="logout-button">
          Logout
        </button>
      </form>
      <div className="blog-space">
        <nav className="posts">
          <ul>
            {posts.map((post) => (
              <li key={post.slug}>
                <Link to={post.slug} className="post-list">
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
          <div className="toPosts">
            <Link to="../posts">back to post list</Link>
          </div>
        </nav>
        <main className="post-container">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
