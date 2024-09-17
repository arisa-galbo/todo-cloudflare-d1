import { loader } from "./loader";
export { loader };
import { useLoaderData, Link } from "@remix-run/react";
import "../styles/posts.css";
interface Post {
  slug: string;
  title: string;
  markdown: string;
}

interface User {
  id: number;
  name: string;
  email: string;
}

export default function Posts() {
  const { posts, users } = useLoaderData<{ posts: Post[]; users: User[] }>();
  return (
    <div className="container">
      <h1 className="title">Posts</h1>
      <ul className="posts-list">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={post.slug} className="text-blue-600 underline">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
      <Link to="admin" className="admin-link">
        Admin
      </Link>
    </div>
  );
}
