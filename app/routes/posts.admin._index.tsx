import { Link } from "@remix-run/react";
import "../styles/admin.css";
export default function AdminIndex() {
  return (
    <p>
      <Link to="new" className="create-link">
        Create a New Post
      </Link>
    </p>
  );
}
