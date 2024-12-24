export const formatUser = (user) => {
  const { password_hash, role, ...formattedUser } = user.toJSON();
  return formattedUser;
};