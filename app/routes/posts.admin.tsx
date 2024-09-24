import { Link, useLoaderData, Outlet } from "@remix-run/react";
import { loader } from "./loader";
import "../styles/admin.css";
export { loader };

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
