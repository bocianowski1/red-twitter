import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import ProfileImage from "~/components/utils/profile-image";
import BottomTabs from "~/components/layout/bottom-tabs";
import Header from "~/components/layout/header";
import Link from "next/link";
import { useSiteContext } from "~/context/site-context";

const Profile = () => {
  const { data } = useSession();
  const user = data?.user;
  const { setActiveSection } = useSiteContext();

  useEffect(() => {
    setActiveSection("");
  }, []);

  return (
    <>
      <Header showStories={false} />

      <div className="flex h-screen flex-col items-center justify-center gap-8 py-16 text-gray-800">
        <ProfileImage size={10} image={user?.image ?? ""} hasRing={false} />
        <h2 className=" text-3xl font-extrabold">
          {data ? user?.name : "return to"}
        </h2>
        {data ? (
          <button
            className="rounded-full bg-black/10 px-10 py-3 font-semibold no-underline transition hover:bg-black/20"
            onClick={() => {
              void signOut();
            }}
          >
            Sign Out
          </button>
        ) : (
          <Link
            className="rounded-full bg-black/10 px-10 py-3 font-semibold no-underline transition hover:bg-black/20"
            href={"/"}
          >
            Home
          </Link>
        )}
      </div>
      {data && <BottomTabs />}
    </>
  );
};

export default Profile;
