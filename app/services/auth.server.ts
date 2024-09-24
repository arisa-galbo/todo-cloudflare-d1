import { Authenticator } from "remix-auth";
import { sessionStorage } from "./session.server";
import { FormStrategy } from "remix-auth-form";
import { login } from "./login.server";

export let authenticator = new Authenticator<number>(sessionStorage);

authenticator.use(
  new FormStrategy(async ({ form }) => {
    let email = form.get("email");
    let password = form.get("password");
    let userId = await login(String(email), String(password));
    console.log(userId);
    return userId;
  }),
  "user-login"
);
