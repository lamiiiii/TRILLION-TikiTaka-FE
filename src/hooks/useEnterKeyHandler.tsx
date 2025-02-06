import React, {useCallback} from 'react';

// Enter 키를 눌렀을 때 실행할 동작을 처리하는 훅
export const useEnterKeyHandler = (callback: () => void) => {
  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        callback();
      }
    },
    [callback]
  );

  // 컴포넌트가 마운트되었을 때 이벤트 리스너 등록
  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);
};
