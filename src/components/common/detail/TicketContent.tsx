interface TicketContentProps {
  content: string;
}

export default function TicketContent({content}: TicketContentProps) {
  return (
    <div className="w-full h-[400px] overflow-scroll p-5 border border-gray-2 rounded-[4px] bg-white text-subtitle-regular text-gray-15">
      {content}
    </div>
  );
}
