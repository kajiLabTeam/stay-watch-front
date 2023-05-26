import { useRef, useEffect, useState } from 'react';
import React from 'react';
import { useRoomState } from '@/features/floorMap/roomState';
import { PopoverRoom } from '@/types/roomFloormap';

export const useFloorMapCanvas = () => {
  const { viewerRooms } = useRoomState();
  const [viewingRoomId, setViewingRoomId] = useState(0);
  const [popoverRoom, setPopoverRoom] = useState<PopoverRoom>();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const CANVAS_WIDTH = 2880;
  const CANVAS_HEIGHT = 1800;

  const getContext = (): CanvasRenderingContext2D | null => {
    const canvas: HTMLCanvasElement | null = canvasRef.current; // canvas の型を HTMLCanvasElement | null に指定
    return canvas ? canvas.getContext('2d') : null;
  };

  useEffect(() => {
    // viewerRoomsが更新されたら動く
    const buildingImage = new Image();
    const ctx: CanvasRenderingContext2D | null = getContext(); // ctx の型を CanvasRenderingContext2D | null に指定
    if (ctx && viewerRooms) {
      // 初期化処理
      console.log('初期化開始');
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.strokeRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      console.log('初期化終了');
      buildingImage.src = `/floor_maps/4g-honkan-bekkan.jpg`;

      const drawBuildingToCanvas = () => {
        console.log('drawBuildingToCanvas開始');
        ctx.fillStyle = 'gray';
        ctx.strokeRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.drawImage(
          buildingImage,
          1,
          1,
          buildingImage.width * (CANVAS_HEIGHT / buildingImage.height),
          buildingImage.height * (CANVAS_HEIGHT / buildingImage.height),
        );
        console.log('drawBuildingToCanvas終了');
      };

      const drawUsersToCanvas = () => {
        console.log('drawUsersToCanvas開始');
        console.log(viewerRooms);
        viewerRooms.map((viewerRoom) => {
          // console.log(roomInformation);
          // console.log('1描きよ');
          ctx.fillStyle = 'red';
          ctx.font = '48px serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(String(viewerRoom.userCount), viewerRoom.left, viewerRoom.top);
        });
        console.log('drawUsersToCanvas終了');
      };
      buildingImage.onload = () => {
        drawBuildingToCanvas();
        drawUsersToCanvas();
      };
    }
  }, [viewerRooms]);

  // canvas上でマウスが動いた時の処理
  const displayPopover = (e: React.MouseEvent<HTMLCanvasElement>) => {
    // console.log('要素での座標');
    // console.log(e.clientX);
    // console.log(e.clientY);
    const canvasElementRatio = canvasRef.current!.clientWidth / CANVAS_WIDTH;
    const rect = canvasRef.current?.getBoundingClientRect();
    // console.log('canvas内での座標');
    const clientCanvasX = Math.trunc((e.clientX - Math.floor(rect!.left)) / canvasElementRatio);
    const clientCanvasY = Math.trunc((e.clientY - Math.floor(rect!.top)) / canvasElementRatio);
    // console.log(clientCanvasX);
    // console.log(clientCanvasY);
    let clickedRoom = false;
    viewerRooms?.map((viewerRoom) => {
      // ?なのはviewerRoomsがnullだったらcanvasの初期化が行われないためdisplayPopvoerがそもそも動かない
      if (
        Math.abs(clientCanvasX - viewerRoom.left) < 50 &&
        Math.abs(clientCanvasY - viewerRoom.top) < 50
      ) {
        // console.log(viewingRoomId);
        clickedRoom = true;
        setPopoverRoom({
          roomId: viewerRoom.roomId,
          roomName: viewerRoom.roomName,
          userNames: viewerRoom.userNames,
          left: e.clientX,
          top: e.clientY,
        });
        setViewingRoomId(viewerRoom.roomId);
      }
    });
    if (!clickedRoom) {
      setViewingRoomId(0);
    }
  };

  return { CANVAS_WIDTH, CANVAS_HEIGHT, canvasRef, viewingRoomId, popoverRoom, displayPopover };
};
