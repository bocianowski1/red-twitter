import React from "react";
import BottomTabs from "./bottom-tabs";
import Header from "./header";

const Layout = () => {
  return (
    <div>
      <Header showStories={false} />
      <BottomTabs />
    </div>
  );
};

export default Layout;
