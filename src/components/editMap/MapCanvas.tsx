import React from 'react';
import { EditingPolygonCanvas } from "@/components/editMap/EditingPolygonCanvas"
import { FloorMapCanvas } from "@/components/editMap/FloorMapCanvas";
import { RoomCanvas } from "@/components/editMap/RoomCanvas";
import { EditorFloorMap } from "@/types/roomFloormap";

export const MapCanvas = (props: any) =>{

  return (
    // "relative"でフロアマップ、登録済み部屋達、編集中の部屋、の複数canvasをレイヤーとして重ねている
    <div className="relative">
      <FloorMapCanvas
        buildingID={2}
      />
      {props.mapsdata.map((mapdata: EditorFloorMap) => {
        return (
          <div key={mapdata.roomID}>
              <RoomCanvas
                  roomID = { mapdata.roomID }
                  polygon = { mapdata.polygon }
                  color = {mapdata.color}
              />
          </div>
        );
      })}
      <EditingPolygonCanvas
        setEditingPolygon = { props.setEditingPolygon }
        editingPolygon = { props.editingPolygon }
        isEditingRoom = {props.isEditingRoom}
        setIsEditingRoom = {props.setIsEditingRoom}
      />
    </div>
  );
}