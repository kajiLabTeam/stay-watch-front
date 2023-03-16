import useSWR from "swr";
import { RegisterdUser } from "@/components/admin/user/RegisterdUser";
import { endpoints } from "@/utils/api";

export const RegisterdUsers = (props: {
}) => {
    const { data: users, error:roomsError } = useSWR<any>(`${endpoints.users}`);

    return (
        <div>
            <RegisterdUser/>
        </div>
    );
};
