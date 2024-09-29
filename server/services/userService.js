import prisma from "../prisma/prisma.js";

const getAllUsers = async () => {
  return await prisma.user.findMany();
};

const createUser = async ({
  id,
  email,
  username,
  given_name,
  family_name,
  picture,
}) => {
  // Check if user with the same id, email, or username already exists
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ id }, { email }, { username }],
    },
  });

  if (existingUser) {
    return { alreadyExists: true };
  }

  const user = await prisma.user.create({
    data: {
      id,
      email,
      username,
      name: `${given_name} ${family_name}`,
      picture,
    },
  });

  return { user, alreadyExists: false };
};

const getUserById = async (id) => {
  return await prisma.user.findUnique({ where: { id: String(id) } });
};

const deleteUserById = async (id) => {
  return await prisma.user.delete({ where: { id: String(id) } });
};

export default { getAllUsers, createUser, getUserById, deleteUserById };
