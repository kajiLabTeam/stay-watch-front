import axios from "axios";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";

type User = {
  id: string;
  name: string;
  team: string;
};

const UserInformation = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios
      .get("https://go-staywatch.kajilab.tk/user/v1/list")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Layout>
      <div className="table-fixed">
        <div className="mt-6 text-4xl">利用者一覧</div>
        <div className="my-4 border"></div>
        <table className="w-full text-2xl table-auto">
          <thead>
            <tr className="text-left text-white bg-gray-700">
              <th className="py-2 px-4 w-1/2 border">Name</th>
              <th className="py-2 px-4 border">Team</th>
            </tr>
          </thead>
          <tbody className="">
            {users.map((user) => (
              <tr className="text-left" key={user.id}>
                <td className="py-2 px-4 border">{user.name}</td>
                <td className="py-2 px-4 border">{user.team}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default UserInformation;
