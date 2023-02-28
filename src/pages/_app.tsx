import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { AnimatePresence } from "framer-motion";
import SiteContext from "~/context/site-context";
import Header from "~/components/layout/header";
import BottomTabs from "~/components/layout/bottom-tabs";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <SiteContext>
        <AnimatePresence>
          <main className="">
            <Component {...pageProps} />
          </main>
        </AnimatePresence>
      </SiteContext>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
