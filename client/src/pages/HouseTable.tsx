import { Button } from "@/components/ui/button";
import { useAxios } from "@/hooks/useAxios";
import { houseType } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { DataTable } from "../components/DataTable";

function HouseTable() {
    const axios = useAxios();
    const [houseData, setHouseData] = useState<houseType[]>();

    async function getHouseData() {
        await axios.get("/house").then((response) => {
            setHouseData(response.data);
        });
    }
    useEffect(() => {
        getHouseData().then(() => {
            console.log("Fetched house data");
        });
    }, []);

    const deleteHandler = (name: string) => {
        axios
            .delete(`/delete?name=${name}`)
            .then((res) => {
                console.log(`House delete response ${res}`);
                getHouseData();
            })
            .catch((e) => console.log(`House delete : ${e}`));
    };

    const columns: ColumnDef<houseType>[] = [
        {
            accessorKey: "name",
            header: "House Name",
        },
        {
            accessorKey: "availibility_date",
            header: "Availibility Date",
            cell: (info: any) => {
                return DateTime.fromISO(info.getValue()).toLocaleString(
                    DateTime.DATETIME_MED
                );
            },
        },
        {
            accessorKey: "city",
            header: "City",
        },
        {
            accessorKey: "rent",
            header: "Rent",
        },
        {
            header: "Action",
            cell: (info) => {
                <Button
                    onClick={() => deleteHandler(`${info.row.original.name}`)}
                    variant={"destructive"}
                >
                    Delete
                </Button>;
            },
        },
    ];

    return (
        <>
            {houseData && (
                <div className="container mx-auto py-10">
                    {houseData && (
                        <DataTable columns={columns} data={houseData} />
                    )}
                </div>
            )}
        </>
    );
}

export default HouseTable;
