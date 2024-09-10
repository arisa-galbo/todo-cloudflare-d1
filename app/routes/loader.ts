import type { LoaderFunctionArgs} from "@remix-run/cloudflare";

export const loader = async ({ context }: LoaderFunctionArgs) => {
  try {
    return await context.db.users.findMany();
  } catch (error) {
    console.error("Failed to load users:", error);
    throw new Response("Internal Server Error", { status: 500 });
  }
}
