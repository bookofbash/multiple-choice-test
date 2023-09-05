import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="text-center h-16 sm:h-20 w-full sm:pt-2 pt-4 border-t mt-5 flex sm:flex-row flex-col justify-between items-center px-3 space-y-3 sm:mb-0 mb-3">
      <div>
        Created by{' '}
        <a
          href="https://linkedin.com/in/bashirharrell"
          target="_blank"
          className="font-bold hover:underline transition underline-offset-2"
        >
          Bashir Harrell{' '}
        </a>
        and{' '}
        <a
          href="https://conversationdesign-ai-2-0.vercel.app/"
          target="_blank"
          className="font-bold hover:underline transition underline-offset-2"
        >
          ConversationDesign.Ai
        </a>
      </div>
    </footer>
  );
}
