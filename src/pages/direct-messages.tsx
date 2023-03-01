import { type Message } from "@prisma/client";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage.mutate({
      message,
      userId: user?.id ?? "",
    });
    setMessage("");
  };

  return (
    <>
      <Header showStories={false} />
      <div className="flex h-screen flex-col items-center justify-end pb-12">
        <div className="flex h-4/5 w-full flex-col-reverse overflow-scroll">
          <div className="mb-8 mt-16 px-16">
            {dms &&
              dms.map((dm: Message) => (
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.25 }}
                  key={dm.id}
                >
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
                </motion.div>
              ))}
          </div>
        </div>

        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex w-screen items-center justify-center gap-4 border-t-[0.5px] border-black/20 bg-gray-50 py-8"
        >
          <ProfileImage size={2.25} image={user?.image ?? ""} hasRing={false} />
          <textarea
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmit(e);
            }}
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
