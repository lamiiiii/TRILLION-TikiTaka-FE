import Input from '../common/Input';

export default function PwdChangeContainer() {
  return (
    <div className="w-[560px] flex flex-col gap-3 mt-[45px]">
      <Input label="현재 비밀번호" type="password" element="input" size="lg" placeholder="현재 비밀번호를 입력해주세요" required />
      <Input label="새 비밀번호" type="password" element="input" size="lg" placeholder="새 비밀번호를 입력해주세요" required />
      <Input label="새 비밀번호 확인" type="password" element="input" size="lg" placeholder="새 비밀번호를 다시 입력해주세요" required />

      <div className="flex justify-center mt-3">
        <button className="w-[118px] main-btn-lg">비밀번호 변경</button>
      </div>
    </div>
  );
}
