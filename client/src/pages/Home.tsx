import HouseCard from "@/components/HouseCard";
import { useAxios } from "@/hooks/useAxios";
import { houseType } from "@/types/types";
import { useEffect, useState } from "react";

export default function Home() {
    const axios = useAxios();
    const [houseData, setHouseData] = useState<houseType[]>();
    useEffect(() => {
        getHouseData();
    }, []);

    async function getHouseData() {
        await axios.get("/house").then((response) => {
            console.log("Fetched house data");
            setHouseData(response.data);
            console.log(houseData);
        });
    }
    return (
        <>
            <div className="w-full grid grid-cols-2 gap-2">
                {houseData &&
                    houseData.map((house, index) => {
                        return <HouseCard data={house} key={index} />;
                    })}
            </div>
        </>
    );
}
