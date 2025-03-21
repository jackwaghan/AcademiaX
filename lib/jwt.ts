import { SignJWT, jwtVerify, JWTPayload } from "jose";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET!);
const ALGORITHM = "HS256";

export async function signToken(payload: JWTPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: ALGORITHM })
    .setIssuedAt()
    .setExpirationTime("7d") // Token expires in 1 hour
    .sign(SECRET_KEY);
}

export async function verifyToken(token: string): Promise<object | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload; // Contains user data
  } catch (error) {
    console.error("Invalid or expired token:", error);
    return null;
  }
}
