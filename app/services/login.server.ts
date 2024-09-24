import { json, LoaderFunctionArgs } from "@remix-run/node";

const loadUsers = async (context: LoaderFunctionArgs["context"]) => {
  try {
    const users = await context.db.users.findMany();
    return users;
  } catch (error) {
    console.error("Failed to load users:", error);
    throw new Response("Internal Server Error", { status: 500 });
  }
};

export async function login(
  email: string,
  password: string,
  context: LoaderFunctionArgs["context"]
): Promise<number> {
  const users = await loadUsers(context);
  const user = users.find((user) => user.email === email);

  if (!user) {
    const errorMessage = "ユーザーが見つかりません。";
    console.error(errorMessage);
    throw new Error(errorMessage);
  }

  if (user.password !== password) {
    const errorMessage = "パスワードが無効です。";
    console.error(errorMessage);
    throw new Error(errorMessage);
  }

  return user.id;
}
