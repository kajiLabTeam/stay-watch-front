import React, { useCallback, useRef, useState } from 'react';
import { useImage } from '@/hooks/useImage';
import { useRoomState } from '@/pages/FloorMap/roomState';
import { PopoverRoom } from '@/types/roomFloormap';

const FLOOR_MAP_IMAGE_PATH = '/floor_maps/14goukan1-5.png';

export const useFloorMapCanvas = () => {
  const { viewerRooms } = useRoomState();
  const [viewingRoomId, setViewingRoomId] = useState(0);
  const [popoverRoom, setPopoverRoom] = useState<PopoverRoom>();
  const { image: buildingImage } = useImage(FLOOR_MAP_IMAGE_PATH);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 画像の natural サイズに Canvas サイズを合わせる
  const canvasSize = buildingImage
    ? { width: buildingImage.naturalWidth, height: buildingImage.naturalHeight }
    : null;

  // canvas の ref コールバック。要素を保持し、画像・滞在者が変わるたびに描画し直す
  const setCanvasElement = useCallback(
    (canvas: HTMLCanvasElement | null): void => {
      canvasRef.current = canvas;
      const ctx = canvas?.getContext('2d');
      if (!ctx || !buildingImage || !viewerRooms) return;

      const { naturalWidth: width, naturalHeight: height } = buildingImage;
      // 初期化処理
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, width, height);
      ctx.strokeRect(0, 0, width, height);

      ctx.fillStyle = 'gray';
      ctx.strokeRect(0, 0, width, height);
      ctx.drawImage(buildingImage, 1, 1, width, height);

      viewerRooms.forEach((viewerRoom) => {
        ctx.fillStyle = 'red';
        ctx.font = "bold 60px 'Segoe Print', sans-serif";
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(String(viewerRoom.userCount), viewerRoom.left, viewerRoom.top);
      });
    },
    [buildingImage, viewerRooms],
  );

  // canvas上でマウスが動いた時の処理
  const displayPopover = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasSize) return;
    // e.clientX, e.clientY : 要素での座標(画面サイズに依存する)
    // clientCanvasX, clientCanvasY: canvas上での座標(画面サイズに依存しない)
    const canvas = e.currentTarget;
    const canvasElementRatio = canvas.clientWidth / canvasSize.width;
    const rect = canvas.getBoundingClientRect();
    // canvas上でのマウスの座標を定義
    const clientCanvasX = Math.trunc((e.clientX - Math.floor(rect.left)) / canvasElementRatio);
    const clientCanvasY = Math.trunc((e.clientY - Math.floor(rect.top)) / canvasElementRatio);

    let isMouseOverRoom = false;
    viewerRooms?.forEach((viewerRoom) => {
      // ?なのはviewerRoomsがnullだったらcanvasの初期化が行われないためdisplayPopvoerがそもそも動かない
      if (
        Math.abs(clientCanvasX - viewerRoom.left) < 50 &&
        Math.abs(clientCanvasY - viewerRoom.top) < 50
      ) {
        isMouseOverRoom = true;
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
    if (!isMouseOverRoom) {
      // マウスが何の部屋にも乗っていなかったらviewingRoomIdを0にする
      setViewingRoomId(0);
    }
  };

  return {
    CANVAS_WIDTH: canvasSize?.width ?? 0,
    CANVAS_HEIGHT: canvasSize?.height ?? 0,
    canvasRef,
    setCanvasElement,
    viewingRoomId,
    popoverRoom,
    displayPopover,
  };
};
