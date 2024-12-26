export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  // At least 8 characters, containing at least one number
  const passwordRegex = /^(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
};
