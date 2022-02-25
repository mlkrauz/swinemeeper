import jwt from "jsonwebtoken";
const { sign, verify } = jwt
import 'dotenv/config';
import { Request } from "express";

// Get secret and define auth expiration duration
const secret: string = process.env.SECRET as string
const expiration: number = 15 * 60 * 1000 // 15 minutes

/**
 * Required values for creation of an Authentication Token
 */
export interface tokenSignature {
  username: string
  email: string
  _id: string
}

export function authMiddleware(req: Request) {
  // Get token from either req.body or query
  let token: string | undefined = req.body.token || req.query.token || req.headers.authorization as string

  if (!token) {
    // No auth token found. Return and proceed.
    return req
  }

  // if the token came from authorization, it will need to be trimed.
  if (req.headers.authorization) {
    token = token?.split(' ')?.pop()?.trim() ?? token
  }

  try {
    const data: string | jwt.JwtPayload = verify(token, secret, { maxAge: expiration });
    req.body.user = data;
  } catch (err) {
    console.error(err);
    console.log('Invalid token');
  }
}

export function signToken({username, email, _id }: tokenSignature): string {
  // Assign incoming data into a new payload
  const payload: tokenSignature = { username, email, _id }

  return sign({ data: payload }, secret, { expiresIn: expiration })
}