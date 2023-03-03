import { Building } from "@/types/roomFloormap";

export const BuildingSelector = (props: {
    buildings:Building[],
    currentSelectedBuildingIndex:number,
    setCurrentSelectedBuildingIndex:React.Dispatch<React.SetStateAction<number>>,
}) => {

    const getBuildingIndexByBuildingName = (buildingName:string) => {
        for (let i = 0; i < props.buildings.length; i++) {
            if(props.buildings[i].buildingName == buildingName){
              return i;
            }
        }
        // console.error("getBuildingIndexByBuildingNameが見つかりません");
        return 0;
    }

    const buildingName = document.getElementById("building-select") as HTMLSelectElement;
    if(buildingName){
      buildingName.onchange = (e) => {
        props.setCurrentSelectedBuildingIndex(getBuildingIndexByBuildingName(buildingName.value));
      }
    }

  return (
    <div>
        <select id="building-select">
            {props.buildings.map((building: Building) => {
                return (
                    <option key={building.buildingId}>
                        { building.buildingName }
                    </option>
                );
            })}
        </select>
    </div>
  );
};