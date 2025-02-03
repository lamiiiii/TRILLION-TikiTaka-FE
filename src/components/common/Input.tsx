interface InputProps {
  type?: string;
  element: 'input' | 'textarea';
  label?: string;
  size: 'sm' | 'lg';
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
  name?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function Input({type, element, label, size, name, value, placeholder, required, maxLength, onChange}: InputProps) {
  return (
    <div className={`flex ${element === 'input' ? ' items-center' : 'items-start '}`}>
      {label && <label className="text-subtitle mr-6 w-[120px]">{label}</label>}
      {element === 'input' ? (
        <input
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          maxLength={maxLength}
          required={required}
          onChange={onChange}
          className={` ${size === 'sm' ? 'py-2' : ' py-4'} px-4 text-subtitle-regular w-full  border border-gray-2 rounded-md focus:outline-none focus:border-main `}
        />
      ) : (
        <textarea
          placeholder={placeholder}
          required={required}
          maxLength={maxLength}
          className={
            'px-4 py-4 resize-none h-[234px] text-subtitle-regular w-full  border border-gray-2 rounded-md focus:outline-none focus:border-main'
          }
        />
      )}
    </div>
  );
}
