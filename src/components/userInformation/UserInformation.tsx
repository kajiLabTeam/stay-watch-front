import useSWR from "swr";
import User from "../../models/user";
import { baseURL } from "../../utils/api";

const UserInformation = () => {
  const { data: users, error } = useSWR<User[]>(`${baseURL}/user/v1/list`);

  if (error) return <div>failed to load</div>;
  if (!users) return <div>loading...</div>;

  return (
    <div className="table-fixed">
      <div className="mt-6 text-2xl md:text-3xl">利用者一覧</div>
      <div className="my-4 border" />
      <table className="w-full text-xl table-auto">
        <thead>
          <tr className="text-left text-white bg-gray-700">
            <th className="py-2 px-4 w-1/2 border">Name</th>
            <th className="py-2 px-4 border">Attribute</th>
          </tr>
        </thead>
        <tbody className="text-lg md:text-2xl">
          {users.map((user) => (
            <tr className="text-left" key={user.id}>
              <td className="py-2 px-4 border">{user.name}</td>
              <td className="flex flex-col  py-2 px-4 border md:flex-row md:gap-4">
                {user.tags.map((tag) => (
                  <div className="" key={tag.id}>
                    {tag.name}
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default UserInformation;
