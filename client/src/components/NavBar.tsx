import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AuthContext } from "@/provider/AuthProvider";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";

export default function NavBar() {
    const navigate = useNavigate();

    const location = useLocation();
    const { user, logOut } = useContext(AuthContext);

    const links = [
        {
            name: "Home",
            url: "/",
        },

        {
            name: "Task Dashboard",
            url: "/dashboard",
        },
    ];

    function logOutHandler() {
        if (logOut) {
            logOut();
        }
    }

    return (
        <nav className="flex items-center mb-20 mt-5 mx-5">
            <div className="navstart mr-10">
                <Logo />
            </div>
            <div className="navmid flex-grow">
                <ul className="hidden md:flex justify-start items-center gap-3">
                    {links.map((link, index) => {
                        return (
                            <li
                                key={index}
                                onClick={() => navigate(link.url)}
                                className={cn(
                                    "cursor-pointer px-2 py-2 transition-all",
                                    {
                                        "bg-primary rounded-md text-white":
                                            location.pathname === link.url,
                                    }
                                )}
                            >
                                {link.name}
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="navend flex justify-end items-center gap-5">
                {user && (
                    <div className="flex justify-center items-center gap-3">
                        <h3 className="hidden md:block">{user?.email}</h3>
                    </div>
                )}
                {user ? (
                    <Button onClick={logOutHandler}>Log Out</Button>
                ) : (
                    <>
                        <Button onClick={() => navigate("/login")}>
                            Log In
                        </Button>
                        <Button onClick={() => navigate("/register")}>
                            Register
                        </Button>
                    </>
                )}
            </div>
        </nav>
    );
}
