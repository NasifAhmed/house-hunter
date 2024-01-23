import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { AuthContext } from "@/provider/AuthProvider";
import { userType } from "@/types/types";
import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<userType>();

    const navigate = useNavigate();
    const { createUser, loading } = useContext(AuthContext);

    const submitHandler = async (data: userType) => {
        console.log(data);
        console.log("Logging in");
        if (createUser) {
            createUser(data);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center gap-4 max-w-xs mx-4 md:mx-auto">
            <h1 className="text-2xl font-semibold tracking-tight">Sign Up</h1>
            <p className="text-sm text-muted-foreground">
                Enter your credentials below to register
            </p>
            <div className="grid gap-6 w-full">
                <form
                    className="space-y-4"
                    onSubmit={handleSubmit(submitHandler)}
                >
                    <div>
                        <Label>Select your user type :</Label>
                        <Controller
                            control={control}
                            name="type"
                            rules={{
                                required: "User type is required",
                            }}
                            render={({ field }) => (
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue=""
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="User Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="owner">
                                            House Owner
                                        </SelectItem>
                                        <SelectItem value="renter">
                                            House Renter
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.type && (
                            <span className="text-destructive">
                                {errors.type.message as string}
                            </span>
                        )}
                    </div>
                    <div>
                        <Label>Name</Label>
                        <Controller
                            control={control}
                            name="name"
                            defaultValue=""
                            rules={{
                                required: "Name is required",
                            }}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    id="name"
                                    placeholder="Your Name"
                                    type="text"
                                />
                            )}
                        />
                        {errors.name && (
                            <span className="text-destructive">
                                {errors.name.message as string}
                            </span>
                        )}
                    </div>
                    <div>
                        <Label>Email</Label>
                        <Controller
                            control={control}
                            name="email"
                            defaultValue=""
                            rules={{
                                required: "Email is required",
                            }}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    id="email"
                                    placeholder="name@example.com"
                                    type="email"
                                    autoComplete="email"
                                />
                            )}
                        />
                        {errors.email && (
                            <span className="text-destructive">
                                {errors.email.message as string}
                            </span>
                        )}
                    </div>
                    <div>
                        <Label>Password</Label>
                        <Controller
                            control={control}
                            name="password"
                            defaultValue=""
                            rules={{
                                required: "Password is mandatory",
                                minLength: {
                                    value: 6,
                                    message:
                                        "Password needs minimum 6 characters",
                                },
                                maxLength: {
                                    value: 25,
                                    message: "Password too long",
                                },
                                pattern: {
                                    value: /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/,
                                    message:
                                        "At lease one special character needed",
                                },
                            }}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    id="password"
                                    type="password"
                                    placeholder="password"
                                />
                            )}
                        />
                        {errors.password && (
                            <span className="text-destructive">
                                {errors.password.message as string}
                            </span>
                        )}
                    </div>
                    <Button
                        type="submit"
                        className={`w-full ${isSubmitting && `disabled`}`}
                    >
                        Register
                    </Button>
                </form>
                <p className="px-8 text-center text-sm text-muted-foreground">
                    Already have an account ?{" "}
                    <span
                        className="underline underline-offset-4 hover:text-primary font-semibold cursor-pointer"
                        onClick={() => navigate("/login")}
                    >
                        login
                    </span>
                    .
                </p>
            </div>
        </div>
    );
}
