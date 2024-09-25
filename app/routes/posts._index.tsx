import { loader } from "./loader";
export { loader };
import { useLoaderData, Link } from "@remix-run/react";
import "../styles/posts.css";

interface Post {
  slug: string;
  title: string;
  markdown: string;
  createdAt: string;
  userId: number;
}

interface User {
  id: number;
  name: string;
  email: string;
}

const groupPostByMonth = (posts: Post[]) => {
  const grouped: { [key: string]: Post[] } = {};

  posts.forEach((post) => {
    const date = new Date(post.createdAt);
    const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;

    if (!grouped[monthYear]) {
      grouped[monthYear] = [];
    }
    grouped[monthYear].push(post);
  });

  return grouped;
};

export default function Posts() {
  const { posts, users } = useLoaderData<{ posts: Post[]; users: User[] }>();
  const groupedPosts = groupPostByMonth(posts);

  return (
    <div className="container">
      <h1 className="title">Posts</h1>
      {Object.entries(groupedPosts).map(([monthYear, postsInMonth]) => (
        <div key={monthYear} className="month-group">
          <h2 className="month-title">{monthYear}</h2>
          <ul className="posts-list">
            {postsInMonth.map((post) => {
              const writer = users.find((user) => user.id === post.userId);
              return (
                <li key={post.slug}>
                  <div className="titleAndWriter">
                    <Link to={post.slug} className="post-title">
                      {post.title}
                    </Link>
                    <p>{writer.name}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      <Link to="admin" className="admin-link">
        Admin
      </Link>
    </div>
  );
}
