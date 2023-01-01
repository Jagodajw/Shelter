import express from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { checkAccountExists } from '../services/AuthService';

const router = express.Router();

router.use((req, res, next) => {
  // #swagger.tags = ['Auth']
  next();
});

router.post('/login', async (req, res) => {
  const login = req.body.login;
  const password = req.body.password;

  // check user in database
  const id = await checkAccountExists(login, password);
  if (id === null) return res.sendStatus(500);
  const accessToken = jwt.sign({ id }, process.env.TOKEN_SECRET as Secret, {
    expiresIn: 86400,
  });
  const refreshToken = jwt.sign(
    { id },
    process.env.REFRESH_TOKEN_SECRET as Secret,
    { expiresIn: 525600 }
  );

  res.send({ accessToken, refreshToken });
});

export default router;
