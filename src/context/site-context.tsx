import { useState, useContext, createContext, ReactNode } from "react";

const Context = createContext({} as any);

const SiteContext = ({ children }: { children: ReactNode }) => {
  const [activeSection, setActiveSection] = useState("home");
  const [isLiked, setIsLiked] = useState(false);

  return (
    <Context.Provider
      value={{
        activeSection,
        setActiveSection,
        isLiked,
        setIsLiked,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useSiteContext = () => useContext(Context);

export default SiteContext;
