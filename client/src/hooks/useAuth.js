import { useContext } from "react";
import { AuthContext } from "../context/authContext";



export const useAuth = () => {
    const auth_info = useContext(AuthContext);

    return auth_info;
}