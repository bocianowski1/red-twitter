import { useSession } from "next-auth/react";
import { FaHome, FaSearch, FaComment } from "react-icons/fa";
import Link from "next/link";
import ProfileImage from "../utils/profile-image";

const BottomTabs = ({ activeSection }: { activeSection: string }) => {
  const { data } = useSession();

  return (
    <nav className="fixed bottom-0 left-0 w-full border-t border-black/50 bg-neutral-100">
      <ul className="flex justify-around text-xl">
        <Link href={"/"}>
          <li
            className={`${
              activeSection === "feed" ? "text-rose-600" : ""
            } py-4 px-8`}
          >
            <FaHome />
          </li>
        </Link>
        <Link href={"/search"}>
          <li
            className={`${
              activeSection === "search" ? "text-rose-600" : ""
            } py-4 px-8`}
          >
            <FaSearch />
          </li>
        </Link>
        <Link href={"/direct-messages"}>
          <li
            className={`${
              activeSection === "messages" ? "text-rose-600" : ""
            } py-4 px-8`}
          >
            <FaComment />
          </li>
        </Link>
        <Link href={"/profile"}>
          <li className="py-4 px-8">
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
