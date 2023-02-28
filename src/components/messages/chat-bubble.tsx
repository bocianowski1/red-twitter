import { useSession } from "next-auth/react";
import { useEffect } from "react";

const ChatBubble = ({
  userId,
  message,
}: {
  userId: string;
  message: string;
}) => {
  const { data } = useSession();
  const user = data?.user;

  useEffect(() => {
    console.log("user id", userId);
    console.log("test user id", user?.id);
  }, []);

  return (
    <>
      {user && (
        <>
          {userId === user.id ? (
            <div className="ml-auto flex w-fit justify-start rounded-full bg-rose-400 px-4 py-2">
              <p className="">{message}</p>
            </div>
          ) : (
            <div className="flex w-fit justify-start rounded-full bg-gray-100 px-4 py-2">
              <p className="">{message}!</p>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ChatBubble;
