interface TemplateCreateViewProps {
  onCancel: () => void;
}

export default function TemplateCreateView({onCancel}: TemplateCreateViewProps) {
  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">템플릿 생성</h2>
      <input className="w-full p-2 border mt-2" placeholder="템플릿 이름 입력" />
      <button className="mt-4 p-2 bg-blue-500 text-white">생성</button>
      <button className="mt-4 p-2 bg-gray-200 ml-2" onClick={onCancel}>
        취소
      </button>
    </div>
  );
}
