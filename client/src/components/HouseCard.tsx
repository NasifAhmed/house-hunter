import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { houseType } from "@/types/types";
import { Button } from "./ui/button";

export default function HouseCard({ data }: { data: houseType }) {
    return (
        <Card className="z-20 max-w-lg w-full">
            <CardHeader>
                <CardTitle className="text-2xl">{data.name}</CardTitle>
                <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
                <div className="text-lg mb-4">
                    <h3>
                        <span className="font-bold text-foreground">
                            Availability Date :{" "}
                        </span>
                        {data.availibility_date}
                    </h3>
                    <h3>
                        <span className="font-bold text-foreground">
                            Address :{" "}
                        </span>
                        {data.address}
                    </h3>
                    <h3>
                        <span className="font-bold text-foreground">
                            City :{" "}
                        </span>
                        {data.city}
                    </h3>
                    <h3>
                        <span className="font-bold text-foreground">
                            Bedrooms :{" "}
                        </span>
                        {data.bedrooms}
                    </h3>
                    <h3>
                        <span className="font-bold text-foreground">
                            Bathrooms :{" "}
                        </span>
                        {data.bathrooms}
                    </h3>
                    <h3>
                        <span className="font-bold text-foreground">
                            Room Size :{" "}
                        </span>
                        {data.room_size}
                        {" sqft"}
                    </h3>
                    <h3>
                        <span className="font-bold text-foreground">
                            Rent per month :{" "}
                        </span>
                        {data.rent}
                    </h3>
                    <h3>
                        <span className="font-bold text-foreground">
                            Phone number :{" "}
                        </span>
                        {data.phone_number}
                    </h3>
                </div>
                <div className=" max-h-80 mb-6 overflow-hidden">
                    <img
                        className="w-full object-cover object-center"
                        src={data.picture}
                        alt=""
                    />
                </div>
                <h3>{data.desc}</h3>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button>Details</Button>
                {/* {userFromDB?.role === "participant" && (
                    <Button>Join Camp</Button>
                )} */}
            </CardFooter>
        </Card>
    );
}
