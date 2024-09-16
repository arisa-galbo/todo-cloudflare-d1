import { connection } from "~/database/client";
import type { Post } from "@prisma/client";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export { prisma };

export async function createPost(post: { title: string; slug: string; markdown: string; }) {
    return prisma.post.create({ data: post });
  }