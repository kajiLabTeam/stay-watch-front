import useSWR from "swr";
import { UserEditForm } from "@/components/admin/user/UserEditForm";
import { endpoints } from "@/utils/api";

export const RegisterdUser = (props: {
}) => {
    const { data: users, error:roomsError } = useSWR<any>(`${endpoints.users}`);

    return (
        <div>
            <UserEditForm/>
        </div>
    );
};