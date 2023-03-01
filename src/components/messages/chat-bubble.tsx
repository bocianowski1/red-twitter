import { useSession } from "next-auth/react";
import ProfileImage from "../utils/profile-image";

const ChatBubble = ({
  userId,
  message,
}: {
  userId: string;
  message: string;
}) => {
  const { data } = useSession();
  const user = data?.user;

  return (
    <>
      {user && (
        <>
          {userId === user.id ? (
            <div className="my-4 ml-auto flex w-fit items-end justify-start gap-2 text-sm">
              <p className=" max-w-[14rem] break-words rounded-2xl bg-rose-400 px-4 py-2">
                {message}
              </p>
              <ProfileImage
                size={1.75}
                image={user.image ?? ""}
                hasRing={false}
              />
            </div>
          ) : (
            <div className="my-4 flex w-fit items-end justify-start gap-2 text-sm">
              <ProfileImage size={1.75} image={""} hasRing={false} />
              <p className=" max-w-[14rem] break-words rounded-2xl bg-gray-100 px-4 py-2">
                {message}
              </p>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ChatBubble;
