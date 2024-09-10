import type { MetaFunction } from "@remix-run/cloudflare";
import { loader } from "./loader";
export { loader };
import { useLoaderData,Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    {
      name: "description",
      content: "Welcome to Remix on Cloudflare!",
    },
  ];
};

interface User {
  id: string;
  name: string;
  email: string;
}

export default function Index() {
  const users = useLoaderData<User[]>();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix on Cloudflare</h1>
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
      <div className="mx-auto mt-16 max-w-7xl text-center">
        <Link to="/posts" className="text-xl text-blue-600 underline">
        Blog Posts
        </Link>
      </div>

      <div>
        <h2>Users</h2>
        <ul>
          {users.map((user: User) => (
            <li key={user.id}>
              <div>ID: {user.id}</div>
              <div>NAME: {user.name}</div>
              <div>EMAIL: {user.email}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
