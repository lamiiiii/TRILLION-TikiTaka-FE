interface InputProps {
  element: 'input' | 'textarea';
  label?: string;
  size: 'sm' | 'lg';
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
}

export default function Input({element, label, size, placeholder, required, maxLength}: InputProps) {
  return (
    <>
      <label className="text-sm font-semibold ml-[5px]">{label}</label>
      {element === 'input' ? (
        <input
          placeholder={placeholder}
          maxLength={maxLength}
          required={required}
          className={` ${size === 'sm' ? 'mt-[10px]' : ''} text-subtitle-regular w-full px-4 py-[9px] border border-gray-2 rounded-md focus:outline-none focus:border-main `}
        />
      ) : (
        <textarea
          placeholder={placeholder}
          required={required}
          maxLength={maxLength}
          className={
            ' resize-none h-[110px] mt-[8px] px-[20px] py-[12px] text-black-0 border border-gray-5 rounded-[10px] focus:outline-none focus:border-primary-1 focus:border-[2px]'
          }
        />
      )}
    </>
  );
}
