import { type Post } from "@prisma/client";
import React from "react";
import Link from "next/link";
// import ProfileImage from "../utils/profile-image";
// import { api } from "~/utils/api";

const Header = ({
  posts,
  showStories,
}: {
  posts?: Post[];
  showStories: boolean;
}) => {
  return (
    <div className="fixed top-0 left-0 z-20">
      <Navbar border={!showStories} />
      {/* {showStories && posts && <Stories posts={posts} />} */}
    </div>
  );
};
const Navbar = ({ border }: { border: boolean }) => {
  return (
    <nav
      className={`fixed top-0 flex h-16 w-full items-center justify-between 
    ${border ? "border-b border-black/20" : ""} bg-gray-50 p-4 text-gray-800`}
    >
      <Link href={"/"}>
        <h1 className="mx-2 text-2xl font-thin">
          <span className="text-rose-500">red</span>
          twitter
        </h1>
      </Link>
    </nav>
  );
};

// const Stories = ({ posts }: { posts?: Post[] }) => {
//   return (
//     <div className="fixed top-16 flex h-16 w-full items-center overflow-scroll border-b border-black/20 bg-gray-50">
//       <ul className="flex gap-8 px-4">
//         {posts &&
//           posts.length > 0 &&
//           posts.map((post: Post) => {
//             const { data: user } = api.users.getUser.useQuery({
//               userId: post.userId,
//             });
//             const userImage = user?.image;
//             return (
//               <li key={post.id}>
//                 <ProfileImage
//                   size={2.25}
//                   image={userImage ?? ""}
//                   hasRing={true}
//                 />
//               </li>
//             );
//           })}
//       </ul>
//     </div>
//   );
// };

export default Header;
