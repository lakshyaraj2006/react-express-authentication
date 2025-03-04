import axios from "../api/axios";
import useAuth from "./useAuth";

const useLogout = () => {
    const {setAuth} = useAuth();

    const logout = async () => {
        setAuth({});

        try {
            const response = await axios.post('/auth/logout', null, {
                withCredentials: true
            })
        } catch (error) {
            console.log(error);
        }
    }

    return logout;
}

export default useLogout;