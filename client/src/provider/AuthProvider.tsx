import { useAxios } from "@/hooks/useAxios";
import { userType } from "@/types/types";
import { ReactNode, createContext, useState } from "react";

type logInData = {
    email: string;
    password: string;
};

type authContext = {
    user: userType;
    loading: boolean;
    createUser: (arg: userType) => void;
    logIn: (arg: logInData) => void;
    logOut: () => void;
    error: string;
};

export const AuthContext = createContext<Partial<authContext>>({});

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const axios = useAxios();

    const [user, setUser] = useState<userType>();
    const [error, setError] = useState<string>();
    const [loading, setLoading] = useState(true);

    const createUser = async (data: userType) => {
        setLoading(true);
        await axios.post("/user", data).then(() => {
            logIn(data).then((response) => {
                console.log(`Logged in user ${JSON.stringify(response)}`);
                setLoading(false);
            });
        });
    };

    const logIn = async (data: logInData) => {
        setLoading(true);
        await axios.get(`/user?email=${data.email}`).then((response) => {
            console.log(response.data[0]);
            // console.log(`Data : ${data}`);
            if (response.data[0].email) {
                if (
                    response.data[0].email === data.email &&
                    response.data[0].password === data.password
                ) {
                    setUser(response.data[0]);
                    setLoading(false);
                } else {
                    setError("Email/Password is incorrect");
                    setLoading(false);
                }
            } else {
                setError("Invalid Email");
            }
        });
    };

    const logOut = () => {
        setLoading(true);
        setUser(undefined);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                createUser,
                logIn,
                logOut,
                error,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
