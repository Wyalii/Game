import jwt from "jsonwebtoken";
export default function IsTokenExpired(token: string) {
  const decoded = jwt.decode(token);
  const currentTime = Math.floor(Date.now() / 1000);
  return decoded.exp < currentTime;
}
