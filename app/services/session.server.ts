import { createCookieSessionStorage } from "@remix-run/node";

const sessionSecret: string | undefined = process.env.SESSION_SECRET;
if (sessionSecret === undefined)
  throw new Error("SESSION_SECRETを設定してください。");

export let sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "auth_session",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: [sessionSecret],
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24,
  },
});
export let { getSession, commitSession, destroySession } = sessionStorage;
