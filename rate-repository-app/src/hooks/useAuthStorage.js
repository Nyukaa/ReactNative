// defines a custom hook `useAuthStorage` that provides access to the authentication storage context in a React application.
import { useContext } from "react";
import AuthStorageContext from "../contexts/AuthStorageContext";

const useAuthStorage = () => {
  return useContext(AuthStorageContext);
};

export default useAuthStorage;
