import { connection } from "~/database/client";
import type { Post } from "@prisma/client";

export async function createPost(
  post: { title: string; slug: string; markdown: string; userId: string },
  db: D1Database
) {
  const prisma = await connection(db);
  try {
    const result = await prisma.post.create({ data: post });
    console.log("Post created:", result);
    return result;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
}

export async function getPost(slug: string, posts: Post[]) {
  return posts.find((post) => post.slug === slug);
}

export async function updatePost(
  slug: string,
  updates: Partial<Pick<Post, "title" | "markdown">>,
  db: D1Database
) {
  const prisma = await connection(db);
  const currentTime = new Date();
  try {
    const dataToUpdate = Object.assign({}, updates, { updatedAt: currentTime });
    const result = await prisma.post.update({
      where: { slug: slug },
      data: dataToUpdate,
    });
    console.log("Post updated:", result);
    return result;
  } catch (error) {
    console.error("Error updating post:", error);
    throw new Error(`Failed to update post: ${error.message}`);
  }
}

export async function deletePost(slug: string, db: D1Database) {
  const prisma = await connection(db);
  try {
    const result = await prisma.post.delete({
      where: { slug: slug },
    });
    console.log("Post deleted:", result);
    return result;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw new Error(`Failed to delete post: ${error.message}`);
  }
}
