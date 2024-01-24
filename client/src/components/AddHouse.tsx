import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAxios } from "@/hooks/useAxios";
import { houseType } from "@/types/types";
import { imgBBupload } from "@/utils/imgBBupload";
import { Controller, useForm } from "react-hook-form";

function AddCamp() {
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<houseType>();

    const axios = useAxios();

    const submitHandler = async (data: houseType) => {
        imgBBupload(data.picture).then((res) => {
            console.log(`ImageBB upload response ${JSON.stringify(res)}`);

            const house: houseType = { ...data };

            console.log(house);

            axios
                .post("/house", house)
                .then((res) => {
                    console.log(`Camp post response ${res}`);
                })
                .catch((e) => console.log(`Camp post error : ${e}`));
        });

        console.log(data);
        reset();
    };

    return (
        <div className="flex flex-col justify-center items-center gap-4 max-w-md mx-4 md:mx-auto">
            <h1 className="text-2xl font-semibold tracking-tight">Add</h1>
            <p className="text-sm text-muted-foreground">
                Enter camp information below
            </p>
            <div className="grid gap-6 w-full">
                <form
                    className="space-y-4"
                    onSubmit={handleSubmit(submitHandler)}
                >
                    <div>
                        <Label htmlFor="name">House Name</Label>
                        <Controller
                            control={control}
                            name="name"
                            defaultValue=""
                            rules={{
                                required: "Name is required",
                                pattern: {
                                    //Check for at least three characters, maximum 20 words and max 200 characters
                                    value: /^(?:\b\w{3,20}\b\s*){1,5}$/,
                                    message: "Invalid name",
                                },
                            }}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    id="name"
                                    placeholder="House name"
                                    type="text"
                                />
                            )}
                        />
                        {errors.name && (
                            <span className="text-destructive">
                                {errors.name.message}
                            </span>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="address">Address</Label>
                        <Controller
                            control={control}
                            name="address"
                            defaultValue=""
                            rules={{
                                required: "Address is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9\s.,#-]+$/,
                                    message: "Invalid address",
                                },
                            }}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    id="address"
                                    placeholder="House address"
                                    type="text"
                                />
                            )}
                        />
                        {errors.address && (
                            <span className="text-destructive">
                                {errors.address.message}
                            </span>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="city">City</Label>
                        <Controller
                            control={control}
                            name="city"
                            defaultValue=""
                            rules={{
                                required: "City is required",
                                pattern: {
                                    value: /^[a-zA-Z\s\-']+$/,
                                    message: "Invalid city",
                                },
                            }}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    id="city"
                                    placeholder="City"
                                    type="text"
                                />
                            )}
                        />
                        {errors.city && (
                            <span className="text-destructive">
                                {errors.city.message}
                            </span>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="picture">Picture of house</Label>
                        <Controller
                            control={control}
                            name="picture"
                            rules={{
                                required: "A picture is required",
                            }}
                            render={({ field }: { field: any }) => (
                                <Input
                                    className="cursor-pointer"
                                    {...field}
                                    value={field.value?.filename}
                                    onChange={(event: any) => {
                                        field.onChange(event.target.files[0]);
                                    }}
                                    id="picture"
                                    type="file"
                                />
                            )}
                        />
                        {errors.picture && (
                            <span className="text-destructive">
                                {errors.picture.message}
                            </span>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="bedrooms">Number of bedrooms</Label>
                        <Controller
                            control={control}
                            name="bedrooms"
                            defaultValue={0}
                            rules={{
                                required:
                                    "Bedroom numbers are mandatory, enter 0 if free",
                                pattern: {
                                    //Check for at least 0, non-negative and max 200
                                    value: /^(?:\b(?:0?|(?:1\d\d?|200))\b)$/,
                                    message: "Invalid amount",
                                },
                            }}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    id="bedrooms"
                                    type="number"
                                    placeholder="0"
                                />
                            )}
                        />
                        {errors.bedrooms && (
                            <span className="text-destructive">
                                {errors.bedrooms.message}
                            </span>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="bathrooms">Number of bathrooms</Label>
                        <Controller
                            control={control}
                            name="bathrooms"
                            defaultValue={0}
                            rules={{
                                required:
                                    "bathroom numbers are mandatory, enter 0 if free",
                                pattern: {
                                    //Check for at least 0, non-negative and max 200
                                    value: /^(?:\b(?:0?|(?:1\d\d?|200))\b)$/,
                                    message: "Invalid amount",
                                },
                            }}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    id="bathrooms"
                                    type="number"
                                    placeholder="0"
                                />
                            )}
                        />
                        {errors.bathrooms && (
                            <span className="text-destructive">
                                {errors.bathrooms.message}
                            </span>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="room_size">Room size(in sqft)</Label>
                        <Controller
                            control={control}
                            name="room_size"
                            defaultValue={0}
                            rules={{
                                required: "Room size is mandatory",
                                pattern: {
                                    //Check for at least 0, non-negative and max 10000
                                    value: /^(?:[2-9]\d|\d{2,3}|10000)$/,
                                    message: "Invalid amount",
                                },
                            }}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    id="room_size"
                                    type="number"
                                    placeholder="0"
                                />
                            )}
                        />
                        {errors.room_size && (
                            <span className="text-destructive">
                                {errors.room_size.message}
                            </span>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="availibility_date">
                            Availibility Date
                        </Label>
                        <Controller
                            control={control}
                            name="availibility_date"
                            defaultValue=""
                            rules={{
                                required: "Date is mandatory",
                            }}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    id="availibility_date"
                                    type="date"
                                    placeholder="Availibility Date"
                                />
                            )}
                        />
                    </div>
                    <div>
                        <Label htmlFor="rent">Rent</Label>
                        <Controller
                            control={control}
                            name="rent"
                            defaultValue={0}
                            rules={{
                                required: "Rent is mandatory",
                                pattern: {
                                    //Check for at least 1, non-negative and max 999999
                                    value: /^(?!0+$)[1-9]\d{0,5}$/,
                                    message: "Invalid amount",
                                },
                            }}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    id="rent"
                                    type="number"
                                    placeholder="0"
                                />
                            )}
                        />
                        {errors.rent && (
                            <span className="text-destructive">
                                {errors.rent.message}
                            </span>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="phone_number">Phone Number</Label>
                        <Controller
                            control={control}
                            name="phone_number"
                            defaultValue=""
                            rules={{
                                required: "Phone number is required",
                                pattern: {
                                    //Check for phone numbers
                                    value: /^\+8801[3-9]\d{8}$/,
                                    message: "Invalid number",
                                },
                            }}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    id="phone_number"
                                    type="tel"
                                    placeholder="+880 1XXX NNNNNN"
                                />
                            )}
                        />
                        {errors.phone_number && (
                            <span className="text-destructive">
                                {errors.phone_number.message}
                            </span>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="desc">Description</Label>
                        <Controller
                            control={control}
                            name="desc"
                            defaultValue=""
                            rules={{
                                required: "This field is required",
                            }}
                            render={({ field }) => (
                                <Textarea
                                    placeholder="A short description of the house"
                                    id="desc"
                                    // className="resize-none"
                                    {...field}
                                />
                            )}
                        />
                        {errors.desc && (
                            <span className="text-destructive">
                                {errors.desc.message}
                            </span>
                        )}
                    </div>
                    <Button
                        type="submit"
                        className={`w-full ${isSubmitting && `disabled`}`}
                    >
                        Add House
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default AddCamp;
