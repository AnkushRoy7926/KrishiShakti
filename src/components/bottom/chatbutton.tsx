import { IconMessage } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react';

const ChatButton = () => {
  return (
    <Link href="/chat" passHref>
      <div className="fixed right-4 bottom-4 z-80 flex cursor-pointer flex-row gap-2 rounded-full bg-green-600 p-4 text-white shadow-lg transition-colors duration-300 hover:bg-green-700">
        <IconMessage size={24} />
        <p>AI Chat</p>
      </div>
    </Link>
  );
};

export default ChatButton;
