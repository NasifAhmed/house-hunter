import { Button } from "@/components/ui/button";
import HouseTable from "./HouseTable";

export default function OwnerDashboard() {
    return (
        <div>
            <div className="w-full flex justify-center items-center">
                <Button>Add New House</Button>
            </div>
            <HouseTable />
        </div>
    );
}
