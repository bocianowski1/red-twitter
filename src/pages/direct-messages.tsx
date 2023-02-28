import { Message } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { FaPaperPlane, FaTrash } from "react-icons/fa";
import BottomTabs from "~/components/layout/bottom-tabs";
import Header from "~/components/layout/header";
import ChatBubble from "~/components/messages/chat-bubble";
import ProfileImage from "~/components/utils/profile-image";
import { useSiteContext } from "~/context/site-context";
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

  const { setActiveSection } = useSiteContext();

  useEffect(() => {
    setActiveSection("messages");
  }, []);

  return (
    <>
      <Header showStories={false} />
      <div className="flex h-screen flex-col items-center justify-end pb-28">
        <div className="w-2/3">
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
          className="flex items-center gap-4 py-4"
        >
          <ProfileImage size={2.25} image={user?.image ?? ""} hasRing={false} />
          <input
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
        {data && <BottomTabs />}
      </div>
    </>
  );
};

export default DirectMessages;