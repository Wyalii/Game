import { createContext } from "react";
type ExistingUserType = {
  hasAccount: boolean;
  setHasAccount: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ExistingUserContext = createContext<ExistingUserType | null>(null);
