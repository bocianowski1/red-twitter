import { type NextPage } from "next";
import Head from "next/head";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

import Feed from "~/components/posts/feed";
import Login from "~/components/utils/login";
import BottomTabs from "~/components/layout/bottom-tabs";
import Header from "~/components/layout/header";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();

  return (
    <>
      <Head>
        <title>Twitter Clone</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
      >
        {sessionData && <Header showStories />}
        {sessionData ? <Feed /> : <Login />}
        {sessionData && <BottomTabs />}
      </motion.section>
    </>
  );
};

export default Home;
