import jwt, { Secret } from 'jsonwebtoken';
export const authenticate = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token === null)
    return res.status(401).json({ ERROR_CODE: 'UNAUTHORIZED' });

  jwt.verify(
    token,
    process.env.TOKEN_SECRET as Secret,
    (err: unknown, user: unknown) => {
      if (err) return res.status(403).json({ ERROR_CODE: 'FORBIDDEN' });

      req.user = user;
      next();
    }
  );
};
