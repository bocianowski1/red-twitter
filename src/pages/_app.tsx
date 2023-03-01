import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { AnimatePresence } from "framer-motion";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <AnimatePresence>
        <main className="">
          <Component {...pageProps} />
        </main>
      </AnimatePresence>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
