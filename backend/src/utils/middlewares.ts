import { authenticate } from '../middlewares/authentication';
import { shelterAuthenticate } from '../middlewares/shelterAuthentication';

export const middlewares = [authenticate, shelterAuthenticate];
