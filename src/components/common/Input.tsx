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
    <div className={`flex ${element === 'input' ? ' items-center' : 'items-start '}`}>
      <label className="text-subtitle mr-6 w-[108px]">{label}</label>
      {element === 'input' ? (
        <input
          placeholder={placeholder}
          maxLength={maxLength}
          required={required}
          className={` ${size === 'sm' ? 'py-3' : ' py-4'} px-4 text-subtitle-regular w-[328px]  border border-gray-2 rounded-md focus:outline-none focus:border-main `}
        />
      ) : (
        <textarea
          placeholder={placeholder}
          required={required}
          maxLength={maxLength}
          className={
            'px-4 py-4 resize-none h-[234px] text-subtitle-regular w-[328px]  border border-gray-2 rounded-md focus:outline-none focus:border-main'
          }
        />
      )}
    </div>
  );
}
