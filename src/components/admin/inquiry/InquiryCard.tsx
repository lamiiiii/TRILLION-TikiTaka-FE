interface InquiryCardProps {
  id: number;
  user: string;
  type: string;
  title: string;
  content: string;
  date: string;
  status: string;
  onReplyClick: (id: number) => void;
}

export default function InquiryCard({id, type, title, content, date, status, onReplyClick}: InquiryCardProps) {
  return (
    <div className="flex gap-4 py-4 px-4 border border-gray-2 bg-white items-center rounded cursor-pointer hover:bg-gray-1">
      <div className="w-[15%] text-gray-700 text-subtitle-regular">{type}</div>
      <div className="w-[50%] ">
        <div className=" text-gray-900 text-subtitle-regular">{title}</div>
        <div className="w-[422px] text-gray-6 text-caption-regular truncate">{content}</div>
      </div>
      <div className="w-[20%] text-gray-15 text-body-regular">{date}</div>
      <div className="w-[20%]">
        <button
          className={`px-4 py-1 rounded text-white text-body-bold ${status === '답변 완료' ? 'bg-gray-400' : 'bg-main'}`}
          onClick={() => onReplyClick(id)}
        >
          {status}
        </button>
      </div>
    </div>
  );
}
