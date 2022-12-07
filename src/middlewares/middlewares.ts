import { verify } from 'jsonwebtoken';
import jwt from '../config/jwt-config';
import { Request, Response, NextFunction } from 'express';
import { UnauthorizedException } from '@nestjs/common';

interface TokenPayload {
  iat: number;
  exp: number;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export function EnsureAuthenticatedMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  console.log('chama aqui? ', authHeader);

  if (!authHeader) {
    throw new UnauthorizedException('JWT token está faltando');
  }
  const [, token] = authHeader.split(' ');
  const decoded = verify(token, jwt.secret);
  const { id, firstName, lastName, email } = decoded as TokenPayload;
  req.user = { id, firstName, lastName, email };
  return next();
}
