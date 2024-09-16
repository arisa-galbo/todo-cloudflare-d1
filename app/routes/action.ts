import { connection } from '~/database/client';
import type { Post } from '@prisma/client';

export async function createPost(post: { title: string; slug: string; markdown: string; }, db: D1Database) {
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