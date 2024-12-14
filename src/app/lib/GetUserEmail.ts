import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export default function GetUserEmail() {
  const token = Cookies.get("token");
  if (!token) {
    console.error("No token found in cookies.");
    return null;
  }
  try {
    const decoded = jwtDecode<{ email: string }>(token);
    return decoded.email;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
}
