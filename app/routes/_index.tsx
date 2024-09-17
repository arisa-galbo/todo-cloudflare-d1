import type { MetaFunction } from "@remix-run/cloudflare";
import { loader } from "./loader";
export { loader };
import { useLoaderData, Link } from "@remix-run/react";
import "../styles/index.css";
export const meta: MetaFunction = () => {
  return [
    { title: "blog pages" },
    {
      name: "description",
      content: "Welcome to Remix on Cloudflare!",
    },
  ];
};

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

export default function Index() {
  const { posts, users } = useLoaderData<{ posts: Post[]; users: User[] }>();
  return (
    <div className="top-page">
      <h1 className="title">Welcome to Remix on Cloudflare</h1>
      <h2 className="subtitle">this is blog pages</h2>
      <div className="link-space">
        <Link to="/posts" className="blog-link">
          Blog Posts
        </Link>
      </div>
      <ul>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://developers.cloudflare.com/pages/framework-guides/deploy-a-remix-site/"
            rel="noreferrer"
          >
            Cloudflare Pages Docs - Remix guide
          </a>
        </li>
      </ul>
      <div className="users-list">
        <h2 className="subtitle">Users</h2>
        <ul className="users">
          {users.map((user) => (
            <li key={user.id}>
              <div>NAME: {user.name}</div>
              <div>EMAIL: {user.email}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
