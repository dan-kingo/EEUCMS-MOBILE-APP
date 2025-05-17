import axios from 'axios';
import { useState } from 'react';

interface Message {
  user: string;
  bot: string;
}

const useMessage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userInput = input;
    setMessages((prev) => [...prev, { user: userInput, bot: '...' }]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post(
        'https://aicms-api.onrender.com/api/chatbot',
        {
          message: userInput,
        }
      );

      const botReply = response?.data?.reply || 'No response from bot.';
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { user: userInput, bot: botReply },
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { user: userInput, bot: 'Sorry, something went wrong.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return {
    isOpen,
    setIsOpen,
    input,
    setInput,
    sendMessage,
    loading,
    messages,
  };
};

export default useMessage;
