// import { Inquiry as InquiryType } from "../../../api/service/inquiry"; // 타입 별칭 적용
// import { useState } from "react";
// import { DownIcon } from "../../common/Icon";

// interface InquiryProps {
//   data: InquiryType;
// }

// export default function InquiryCard({ data }: InquiryProps) { // 🔥 컴포넌트 이름 `InquiryCard` 유지
//   const [isAnswerVisible, setIsAnswerVisible] = useState(false);

//   const toggleAnswerVisibility = () => {
//     setIsAnswerVisible((prev) => !prev);
//   };

//   return (
//     <div className="flex flex-col gap-2">
//       <section className="flex w-full p-5 rounded bg-white border border-gray-2 text-subtitle-regular">
//         <p className="mr-[59px]">{data.type}</p>
//         <div>
//           <p>{data.title}</p>
//           <p className="w-[450px] text-gray-6 text-body-regular mt-1 mr-[120px]">{data.content}</p>
//         </div>
//         <p className="mr-[55px]">{data.createdAt}</p>
//         <div className="relative flex gap-2">
//           <p>{data.status}</p>

//           {data.status === "답변 완료" && (
//             <div
//               className="absolute top-0 left-16"
//               style={{
//                 color: "black",
//                 transform: isAnswerVisible ? "rotate(180deg)" : "rotate(0deg)",
//                 transition: "transform 0.3s ease",
//               }}
//               onClick={toggleAnswerVisibility}
//             >
//               <DownIcon />
//             </div>
//           )}
//         </div>
//       </section>

//       {isAnswerVisible && data.answer && (
//         <section className="flex w-full p-5 rounded bg-gray-1 border border-gray-2 text-subtitle-regular">
//           <p className="mr-[30px]">문의 답변</p>
//           <div>
//             <p> Re: {data.title}</p>
//             <p className="w-[600px] text-gray-6 text-body-regular mt-1 mr-[120px]">{data.answer?.content}</p>
//           </div>
//         </section>
//       )}
//     </div>
//   );
// }
