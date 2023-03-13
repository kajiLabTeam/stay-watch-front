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

    const setIndex : React.ChangeEventHandler<HTMLSelectElement> = (ev) => {
      props.setCurrentSelectedBuildingIndex(getBuildingIndexByBuildingName(ev.target.value));
    }

  return (
    <div className="border-x-4 border-t-4">
        <select value={props.buildings[props.currentSelectedBuildingIndex].buildingName} onChange={setIndex} className="border-2">
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