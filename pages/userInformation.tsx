import axios from "axios";
import { useState, useEffect } from "react";
import useSWR from "swr";
import Layout from "../components/Layout";
import User from "../models/user";
import { baseURL } from "../utils/api";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const UserInformation = () => {
  const { data: users, error } = useSWR<User[]>(
    `${baseURL}/user/v1/list`,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!users) return <div>loading...</div>;

  return (
    <Layout>
      <div className="table-fixed">
        <div className="mt-6 text-4xl">利用者一覧</div>
        <div className="my-4 border" />
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
                <td className="flex gap-4 py-2 px-4 border">
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
