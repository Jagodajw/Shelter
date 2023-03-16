import { prisma } from '../..';

export class AnimalsAvatarService {
  constructor() {}

  public static async update(animalId: string, avatar: any) {
    const response = await prisma.animals.update({
      where: { ID: animalId },
      data: { avatar },
      select: { avatar: true },
    });

    return response.avatar;
  }

  public static async get(
    animalId: string
  ): Promise<Buffer | null | undefined> {
    const response = await prisma.animals.findUnique({
      where: { ID: animalId },
      select: { avatar: true },
    });

    return response?.avatar;
  }
}