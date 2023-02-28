import {
  useState,
  useContext,
  createContext,
  ReactNode,
  Dispatch,
} from "react";

interface ContextType {
  activeSection: string;
}
const Context = createContext<ContextType | null>(null);

const SiteContext = ({ children }: { children: ReactNode }) => {
  const [activeSection, setActiveSection] = useState<ContextType>({
    activeSection: "feed",
  });

  return <Context.Provider value={activeSection}>{children}</Context.Provider>;
};

export const useSiteContext = () => useContext(Context);

export default SiteContext;
