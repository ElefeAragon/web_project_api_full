import { createContext, useContext } from "react";

export const CurrentUserContext = createContext(null);

export const useCurrentUser = () => useContext(CurrentUserContext);