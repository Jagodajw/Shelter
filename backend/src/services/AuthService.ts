import { prisma } from '..';

export async function checkAccountExists(
  login: string,
  password: string
): Promise<string | null> {
  const account = await prisma.account.findUnique({
    where: { username: login },
  });
  return account?.password === password ? account.ID : null;
}
