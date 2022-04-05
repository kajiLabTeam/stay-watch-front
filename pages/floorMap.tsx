import Layout from "../components/Layout";
import Image from "next/image";

const FloorMap = () => {
  return (
    <Layout>
      <div className="relative bg-slate-600 ">
        <Image
          src={"/kajlab-room.jpg"}
          alt="kajlab-room"
          width={1600}
          height={900}
        />
        <p className="absolute top-[115px] left-6 text-red-500">◯</p>
      </div>
    </Layout>
  );
};

export default FloorMap;
