import { useState, useEffect } from 'react';

interface UseLimitedInputProps {
  maxLength: number;
  initialValue?: string;
  onLimitExceed?: () => void;
  onChange?: (value: string) => void;
}

export function useLimitedInput({ maxLength, initialValue = '', onLimitExceed, onChange }: UseLimitedInputProps) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]); // 🔥 초기값이 변경되면 반영

  const handleChange = (newValue: string) => {
    if (newValue.length > maxLength) {
      onLimitExceed?.();
      setValue(newValue.slice(0, maxLength));
      onChange?.(newValue.slice(0, maxLength));
    } else {
      setValue(newValue);
      onChange?.(newValue);
    }
  };

  return { value, setValue: handleChange };
}