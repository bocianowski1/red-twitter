import { useSession } from "next-auth/react";
import { useState } from "react";
import { FaHome, FaSearch, FaComment } from "react-icons/fa";
import Link from "next/link";
import ProfileImage from "../utils/profile-image";
import { useSiteContext } from "~/context/site-context";

const BottomTabs = () => {
  const { activeSection, setActiveSection } = useSiteContext();
  const [showProfile, setShowProfile] = useState(true);
  const { data } = useSession();

  return (
    <nav className="fixed bottom-0 left-0 w-full border-t border-black/50 bg-neutral-100">
      <ul className="flex justify-around py-4 text-xl">
        <Link href={"/"}>
          <li
            onClick={() => {
              setActiveSection("feed");
              if (showProfile) setShowProfile(false);
            }}
            className={`${
              activeSection === "feed" && "text-rose-600"
            } hover:cursor-pointer`}
          >
            <FaHome />
          </li>
        </Link>
        <Link href={"/search"}>
          <li
            onClick={() => {
              setActiveSection("search");
              if (showProfile) setShowProfile(false);
            }}
            className={`${
              activeSection === "search" && "text-rose-600"
            } hover:cursor-pointer`}
          >
            <FaSearch />
          </li>
        </Link>
        <Link href={"/direct-messages"}>
          <li
            onClick={() => {
              setActiveSection("messages");
              if (showProfile) setShowProfile(false);
            }}
            className={`${
              activeSection === "messages" && "text-rose-600"
            } hover:cursor-pointer`}
          >
            <FaComment />
          </li>
        </Link>
        <Link href={"/profile"}>
          <li
            className="hover:cursor-pointer"
            onClick={() => {
              setActiveSection("profile");
              setShowProfile(true);
            }}
          >
            <ProfileImage
              size={1.5}
              image={data?.user.image ?? ""}
              hasRing={false}
            />
          </li>
        </Link>
      </ul>
    </nav>
  );
};

export default BottomTabs;
