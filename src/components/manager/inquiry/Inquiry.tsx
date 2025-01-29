import {InquiryData} from '../../../interfaces/interfaces';

interface InquiryProps {
  data: InquiryData;
}

export default function Inquiry({data}: InquiryProps) {
  return (
    <div className="flex w-full p-5 rounded bg-white border border-gray-2 text-subtitle-regular">
      <p className="mr-[59px]">{data.type}</p>
      <div>
        <p>{data.title}</p>
        <p className="w-[450px] text-gray-6 text-body-regular mt-1 mr-[120px]">{data.content}</p>
      </div>
      <p className="mr-[55px]">{data.date}</p>
      <p>{data.status}</p>
    </div>
  );
}
