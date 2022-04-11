import Layout from "../components/Layout";
import Image from "next/image";
import { useRef, useEffect } from "react";
import { SizeMe } from "react-sizeme";
import PopoverTop from "../components/PopoverTop";

const FloorMap = () => {
  const elm = useRef(null);

  return (
    <Layout>
      <SizeMe monitorHeight monitorWidth>
        {({ size }) => {
          console.log(size.width);

          if (size.height != null && size.width != null) {
            return (
              <div className="relative bg-slate-600 ">
                <Image
                  src={"/kajlab-room.jpg"}
                  alt="kajlab-room"
                  width="1600vmin"
                  height="900vmin"
                />
                {/* <img src={"/kajlab-room.jpg"} alt="" /> */}
                <button onClick={() => console.log("hello")}>
                  <p
                    className="absolute  text-red-400"
                    style={{
                      left: (size.width / 100) * 91.7,
                      top: ((size.height - 10) / 100) * 93,
                      fontSize: size.width / 80,
                    }}
                  >
                    5人
                  </p>
                </button>
                <p
                  className="absolute  text-red-400"
                  style={{
                    left: (size.width / 100) * 85.5,
                    top: ((size.height - 10) / 100) * 93,
                    fontSize: size.width / 80,
                  }}
                >
                  5人
                </p>
                <p
                  className="absolute  text-red-400"
                  style={{
                    left: (size.width / 100) * 35.5,
                    top: ((size.height - 10) / 100) * 62.5,
                    fontSize: size.width / 80,
                  }}
                >
                  5人
                </p>

                <div
                  className="absolute  text-red-400"
                  style={{
                    left: (size.width / 100) * 59.7,
                    top: ((size.height - 10) / 100) * 62.5,
                    fontSize: size.width / 80,
                  }}
                >
                  <PopoverTop></PopoverTop>
                </div>
              </div>
            );
          }

          return <div>loading</div>;
        }}
      </SizeMe>
    </Layout>
  );
};

export default FloorMap;
