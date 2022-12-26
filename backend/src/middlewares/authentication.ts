import jwt, { Secret } from 'jsonwebtoken';
export const authenticate = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token === null) return res.sendStatus(401);

  jwt.verify(
    token,
    process.env.TOKEN_SECRET as Secret,
    (err: any, user: any) => {
      if (err) return res.sendStatus(403);

      req.user = user;
      next();
    }
  );
};