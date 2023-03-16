import useSWR from "swr";
import StayerType from "@/types/stayer";
import { endpoints } from "@/utils/api";

const Stayer = () => {
  const { data, error } = useSWR<StayerType[]>(`${endpoints.stayers}`); // (1)
  if (error)
    return (
      <div>
        <div className="mt-6 text-4xl">滞在者一覧</div>
        <div className="my-4 border" />
      </div>
    );
  if (!data) return <div>loading...</div>;

  return (
    <div>
      <div className="mt-6 text-2xl md:text-3xl">滞在者一覧</div>
      <div className="my-4 border" />
      <table className="w-full table-fixed text-xs sm:text-base md:text-2xl">
        <thead>
          <tr className="bg-gray-700 text-left text-white">
            <th className="w-1/5 border py-2 pl-4 md:w-1/5">Name</th>
            <th className="w-1/5 border py-2 pl-4 md:w-2/5">Attribute</th>
            <th className="w-1/5 border py-2 pl-4 md:w-1/5">Room</th>
          </tr>
        </thead>
        <tbody>
          {data.map((stayer) => (
            <tr className="text-left" key={stayer.id}>
              <td className="border py-2  pl-2 md:pl-4">{stayer.name}</td>
              <td className=" border  p-2  sm:px-4 md:gap-4 mdlg:flex mdlg:flex-row">
                {stayer.tags.map((tag) => (
                  <div className="" key={tag.id}>
                    {tag.name}
                  </div>
                ))}
              </td>
              <td className="border py-2 px-4">{stayer.room}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Stayer;
