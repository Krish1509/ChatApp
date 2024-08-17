import { useState } from 'react';
import toast from 'react-hot-toast';
import { useSocketContext } from "../context/SocketContext";
import DeleteSound from "../assets/sounds/delete.mp3";

const useDeleteMessage = () => {
  const [loading, setLoading] = useState(false);
  const { socket } = useSocketContext();

  const deleteMessage = async (messageId) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/messages/messages/${messageId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (res.ok) {
        // Play delete sound
        const sound = new Audio(DeleteSound);
        sound.play();

        // Emit the delete event to other clients
        socket.emit("deleteMessage", { messageId });
      } else {
        throw new Error('Failed to delete message');
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, deleteMessage };
};

export default useDeleteMessage;
