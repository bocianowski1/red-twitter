import { FaUserCircle } from "react-icons/fa";

const ProfileImage = ({
  size,
  image,
  hasRing,
}: {
  size: number;
  image: string;
  hasRing: boolean;
}) => {
  return (
    <div style={{ height: `${size}rem`, width: `${size}rem` }}>
      {hasRing ? (
        <div className="h-full w-full rounded-full border border-black bg-gradient-to-tr from-orange-400 via-rose-500 to-fuchsia-500 p-[2px]">
          {image && image.length > 0 ? (
            <img
              className="h-full w-full rounded-full border border-black/60 object-cover"
              src={image ?? ""}
              alt="profile image"
            />
          ) : (
            <FaUserCircle className="h-full w-full rounded-full bg-gray-800 text-white" />
          )}
        </div>
      ) : (
        <>
          {image ? (
            <img
              className="h-full w-full rounded-full border border-black/60 object-cover"
              src={image ?? ""}
              alt="profile image"
            />
          ) : (
            <FaUserCircle className="h-full w-full rounded-full bg-gray-800 text-white" />
          )}
        </>
      )}
    </div>
  );
};

export default ProfileImage;
