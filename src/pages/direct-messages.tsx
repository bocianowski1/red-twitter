import { Message } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FaPaperPlane, FaTrash } from "react-icons/fa";
import BottomTabs from "~/components/layout/bottom-tabs";
import Header from "~/components/layout/header";
import ChatBubble from "~/components/messages/chat-bubble";
import ProfileImage from "~/components/utils/profile-image";
import { api } from "~/utils/api";

const DirectMessages = () => {
  const [message, setMessage] = useState("");
  const { data: dms, refetch: refetchMessages } =
    api.messages.getAll.useQuery();
  const sendMessage = api.messages.sendMessage.useMutation({
    onSuccess: () => {
      void refetchMessages();
    },
  });
  const deleteMessage = api.messages.deleteMessage.useMutation({
    onSuccess: () => {
      void refetchMessages();
    },
  });

  const { data } = useSession();
  const user = data?.user;

  return (
    <>
      <Header showStories={false} />
      <div className="flex h-screen flex-col items-center justify-end pb-12">
        <div className="my-4 w-2/3">
          {dms &&
            dms.map((dm: Message) => (
              <div key={dm.id} className="">
                <ChatBubble userId={user?.id ?? ""} message={dm.message} />
                <ChatBubble userId={"test"} message={"test"} />
                <button
                  onClick={() =>
                    deleteMessage.mutate({
                      id: dm.id,
                    })
                  }
                >
                  <FaTrash />
                </button>
              </div>
            ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage.mutate({
              message,
              userId: user?.id ?? "",
            });
            setMessage("");
          }}
          className="flex w-screen items-center justify-center gap-4 border-t-[0.5px] border-black/20 bg-gray-50 py-8"
        >
          <ProfileImage size={2.25} image={user?.image ?? ""} hasRing={false} />
          <textarea
            required
            value={message}
            maxLength={70}
            onChange={(e) => setMessage(e.target.value)}
            className="flex w-64 resize-none overflow-scroll rounded-md 
                            border border-black/20 px-2 py-1 text-sm ring-0"
          />
          <button type="submit">
            <FaPaperPlane />
          </button>
        </form>
        {data && <BottomTabs activeSection="messages" />}
      </div>
    </>
  );
};

export default DirectMessages;
