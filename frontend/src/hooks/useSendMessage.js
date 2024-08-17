// hooks/useSendMessage.js
import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import SendSound from "../assets/sounds/Send.mp3";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message, imageFile = null) => {
    setLoading(true);
    try {
      let imageUrl = null;

      // If there is an image file, upload it and get the URL
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);

        const imageUploadRes = await fetch('/api/upload-image', {
          method: 'POST',
          body: formData,
        });

        const imageUploadData = await imageUploadRes.json();
        if (imageUploadData.error) throw new Error(imageUploadData.error);

        imageUrl = imageUploadData.url;
      }

      const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, imageUrl }),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setMessages([...messages, data]);
      const sound = new Audio(SendSound);
      sound.play();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;
