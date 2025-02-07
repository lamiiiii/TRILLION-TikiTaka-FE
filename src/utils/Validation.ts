export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePwd = (password: string): boolean => {
  const pwdRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[@#$%^&+=!]).{8,}$/;

  return pwdRegex.test(password);
};

export const validateId = (id: string) => {
  const idRegex = /^[a-z]{3,10}\.[a-z]{1,5}$/; // 아이디 유효성 검사 정규식
  return idRegex.test(id);
};
