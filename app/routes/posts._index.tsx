import { loader } from "./loader";
export { loader };
import { useLoaderData, Link } from "@remix-run/react";

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
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={post.slug} className="text-blue-600 underline">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
      <Link to="admin" className="text-red-600 underline">
        Admin
      </Link>
    </div>
  );
}
