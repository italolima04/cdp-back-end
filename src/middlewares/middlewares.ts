import { verify } from 'jsonwebtoken';
import jwt from '../config/jwt-config';
import { Request, Response, NextFunction } from 'express';
import { HttpException, HttpStatus } from '@nestjs/common';

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
  if (!authHeader) {
    throw new HttpException('JWT token is missing', HttpStatus.UNAUTHORIZED);
  }
  const [, token] = authHeader.split(' ');
  try {
    const decoded = verify(token, jwt.secret);
    const { id, firstName, lastName, email } = decoded as TokenPayload;
    req.user = { id, firstName, lastName, email };
    return next();
  } catch {
    throw new HttpException('Invalid JWT Token', HttpStatus.UNAUTHORIZED);
  }
}
