import { Message } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import BottomTabs from "~/components/bottom-tabs";
import Header from "~/components/header";
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

  return (
    <>
      <Header />
      <div className="flex h-screen flex-col items-center justify-center bg-gray-200">
        <h1>Messages</h1>
        <div>
          {dms &&
            dms.map((dm: Message) => (
              <div key={dm.id} className="flex w-40 justify-between">
                <h3>{dm.message}</h3>
                <button
                  onClick={() =>
                    deleteMessage.mutate({
                      id: dm.id,
                    })
                  }
                >
                  delete
                </button>
              </div>
            ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage.mutate({
              message,
              userId: data?.user.id ?? "",
            });
            setMessage("");
          }}
        >
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">send</button>
        </form>
        {data && <BottomTabs />}
      </div>
    </>
  );
};

export default DirectMessages;
