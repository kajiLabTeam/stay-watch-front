import useSWR from "swr";
//baseURLのimport
import Stayer from "models/stayer";
import { baseURL } from "utils/api";

const Stayer = () => {
  const { data, error } = useSWR<Stayer[]>(`${baseURL}/room/v1/stayer`); // (1)
  if (data !== null) {
    // データがまだない場合は読み込み中のUIを表示する
    console.log(data);
  }

  if (error)
    return (
      <div className="table-fixed">
        <div className="mt-6 text-4xl">滞在者一覧</div>
        <div className="my-4 border" />
        <table className="w-full text-2xl table-auto">
          <thead>
            <tr className="text-left text-white bg-gray-700">
              <th className="py-2 px-4 w-1/3 border">Name</th>
              <th className="py-2 px-4 border">Attribute</th>
              <th className="py-2 px-4 border">Room</th>
            </tr>
          </thead>
          <tbody className="" />
        </table>
      </div>
    );
  if (!data) return <div>loading...</div>;

  return (
    <div className="table-fixed">
      <div className="mt-6 text-4xl">滞在者一覧</div>
      <div className="my-4 border" />
      <table className="w-full text-2xl table-auto">
        <thead>
          <tr className="text-left text-white bg-gray-700">
            <th className="py-2 px-4 w-1/3 border">Name</th>
            <th className="py-2 px-4 border">Attribute</th>
            <th className="py-2 px-4 border">Room</th>
          </tr>
        </thead>
        <tbody className="">
          {data.map((stayer) => (
            <tr className="text-left" key={stayer.id}>
              <td className="py-2 px-4 border">{stayer.name}</td>
              <td className="flex gap-4 py-2 px-4 border">
                {stayer.tags.map((tag) => (
                  <div className="" key={tag.id}>
                    {tag.name}
                  </div>
                ))}
              </td>
              <td className="py-2 px-4 border">{stayer.room}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Stayer;
