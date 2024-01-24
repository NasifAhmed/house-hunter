import { CipherCCMTypes } from "crypto";

export type userType = {
    name: string;
    email: string;
    password: string;
    type: "owner" | "renter";
};

export type houseType = {
    name: string;
    address: string;
    city: string;
    bedrooms: number;
    bathrooms: number;
    room_size: number;
    picture: string;
    availibility_date: string;
    rent: number;
    phone_number: string;
    desc: string;
};
