import bcrypt from "bcrypt";

export const hashpassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
export const comparepassword = async (password, hashpassword) => {
  return await bcrypt.compare(password, hashpassword);
};
export default { hashpassword, comparepassword };
