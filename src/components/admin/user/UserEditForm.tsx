import useSWR from "swr";
import { endpoints } from "@/utils/api";

export const UserEditForm = (props: {
}) => {
    const { data: users, error:roomsError } = useSWR<any>(`${endpoints.users}`);

    return (
        <div>
            a
        </div>
    );
};