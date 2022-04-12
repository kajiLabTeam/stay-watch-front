import axios from "axios";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";

type User = {
  id: string;
  name: string;
  team: string;
  tags: [
    {
      id: number;
      name: string;
    }
  ];
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
              <th className="py-2 px-4 border">Attribute</th>
            </tr>
          </thead>
          <tbody className="">
            {users.map((user) => (
              <tr className="text-left" key={user.id}>
                <td className="py-2 px-4 border">{user.name}</td>
                <td className="py-2 px-4 border flex gap-4">
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
    </Layout>
  );
};

export default UserInformation;
