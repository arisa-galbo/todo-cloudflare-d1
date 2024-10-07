import { Link } from "@remix-run/react";
import "../styles/admin.css";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { authenticator } from "../services/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
  return await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  });
}
export default function AdminIndex() {
  return (
    <p>
      <Link to="new" className="create-link">
        Create a New Post
      </Link>
    </p>
  );
}
