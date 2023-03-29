import { prisma } from '../..';

export class PeopleCoreSerivce {
  constructor() {}

  public static async toggleBlacklistState(
    state: boolean,
    personId: number
  ): Promise<boolean> {
    await prisma.people.update({
      where: { ID: personId },
      data: { black_list: state },
    });

    return state;
  }

  // public static async ()
}
