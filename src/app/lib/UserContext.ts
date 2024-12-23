import { createContext } from "react";
type User = {
  Coins: number;
  setCoins: React.Dispatch<React.SetStateAction<number>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
};

export const UserContext = createContext<User>({
  Coins: 0,
  setCoins: () => {},
  email: "",
  setEmail: () => {},
});
