import { describe, it, expect, vi } from "vitest";
import { login } from "../services/login.server";
import type { LoaderFunctionArgs } from "@remix-run/node";

// モックデータ
const mockUsers = [
  {
    id: 1,
    name: "Test User",
    email: "test@example.com",
    password: "correctPassword",
  },
  {
    id: 2,
    name: "Another User",
    email: "another@example.com",
    password: "anotherPassword",
  },
];

// モックのcontext
const mockContext: LoaderFunctionArgs["context"] = {
  db: {
    users: {
      findMany: vi.fn().mockResolvedValue(mockUsers),
    },
  },
};

describe("login function", () => {
  it("should return userId when email and password are correct", async () => {
    const email = "test@example.com";
    const password = "correctPassword";
    const userId = await login(email, password, mockContext);

    // 期待される結果
    expect(userId).toBe(1);
  });

  it("should throw error when user is not found", async () => {
    const email = "nonexistent@example.com";
    const password = "somePassword";

    // エラーチェック
    await expect(login(email, password, mockContext)).rejects.toThrow(
      "ユーザーが見つかりません。"
    );
  });

  it("should throw error when password is incorrect", async () => {
    const email = "test@example.com";
    const password = "wrongPassword";

    // エラーチェック
    await expect(login(email, password, mockContext)).rejects.toThrow(
      "パスワードが無効です。"
    );
  });
});
