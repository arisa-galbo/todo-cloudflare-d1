import { type AppLoadContext } from '@remix-run/cloudflare'
import { type PlatformProxy } from "wrangler";
import { connection } from './app/database/client'

type Cloudflare = Omit<PlatformProxy<Env>, "dispose">;

declare module "@remix-run/cloudflare" {
  interface AppLoadContext {
    cloudflare: Cloudflare;
    db: Awaited<ReturnType<typeof connection>>;
  }
}

type args = {
  request: Request,
  context: {
    cloudflare: Cloudflare
  }
}
type GetLoadContext = (args: args) => Promise<AppLoadContext>

export const getLoadContext: GetLoadContext = async ({ context }) => {
  return {
    ...context,
    db: await connection(
      context.cloudflare.env['test11-binding'], // 末尾のDBはwrangler.tomlのbindingの値
    ),
  }
}
