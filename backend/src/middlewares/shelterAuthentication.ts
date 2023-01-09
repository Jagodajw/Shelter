import { getShelters } from '../services/SheltersService';

export const shelterAuthenticate = async (req: any, res: any, next: any) => {
  const sheltersId = req.headers['shelters_id'];
  // to cache
  const shelters = await getShelters();

  if (
    sheltersId === null ||
    shelters.findIndex(({ ID }) => ID === sheltersId) === -1
  )
    return res.status(401).json({ ERROR_CODE: 'BAD_SHELTER_ID' });
  next();
};
