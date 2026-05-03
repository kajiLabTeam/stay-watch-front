'use client';
import React, { useRef, useEffect, useState } from 'react';
import { useRoomState } from '@/features/floorMap/roomState';
import { PopoverRoom } from '@/types/roomFloormap';

const FLOOR_MAP_IMAGE_PATH = '/floor_maps/14goukan1-5.png';

export const useFloorMapCanvas = () => {
  const { viewerRooms } = useRoomState();
  const [viewingRoomId, setViewingRoomId] = useState(0);
  const [popoverRoom, setPopoverRoom] = useState<PopoverRoom>();
  const [canvasSize, setCanvasSize] = useState<{ width: number; height: number } | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const getContext = (): CanvasRenderingContext2D | null => {
    const canvas: HTMLCanvasElement | null = canvasRef.current;
    return canvas ? canvas.getContext('2d') : null;
  };

  // 画像を事前ロードしてCanvasサイズを画像のnaturalサイズに合わせる
  useEffect(() => {
    let cancelled = false;
    const probe = new Image();
    probe.onload = () => {
      if (!cancelled) {
        setCanvasSize({ width: probe.naturalWidth, height: probe.naturalHeight });
      }
    };
    probe.onerror = () => {
      if (!cancelled) {
        console.error(`Failed to load floor map image: ${FLOOR_MAP_IMAGE_PATH}`);
      }
    };
    probe.src = FLOOR_MAP_IMAGE_PATH;
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!canvasSize) return;
    const buildingImage = new Image();
    const ctx: CanvasRenderingContext2D | null = getContext();
    if (ctx && viewerRooms) {
      // 初期化処理
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);
      ctx.strokeRect(0, 0, canvasSize.width, canvasSize.height);
      buildingImage.src = FLOOR_MAP_IMAGE_PATH;

      const drawBuildingToCanvas = () => {
        ctx.fillStyle = 'gray';
        ctx.strokeRect(0, 0, canvasSize.width, canvasSize.height);
        ctx.drawImage(
          buildingImage,
          1,
          1,
          buildingImage.width * (canvasSize.height / buildingImage.height),
          buildingImage.height * (canvasSize.height / buildingImage.height),
        );
      };

      const drawUsersToCanvas = () => {
        viewerRooms.forEach((viewerRoom) => {
          ctx.fillStyle = 'red';
          ctx.font = "bold 60px 'Segoe Print', san-serif";
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(String(viewerRoom.userCount), viewerRoom.left, viewerRoom.top);
        });
      };
      buildingImage.onload = () => {
        drawBuildingToCanvas();
        drawUsersToCanvas();
      };
    }
  }, [viewerRooms, canvasSize]);

  // canvas上でマウスが動いた時の処理
  const displayPopover = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasSize) return;
    // e.clientX, e.clientY : 要素での座標(画面サイズに依存する)
    // clientCanvasX, clientCanvasY: canvas上での座標(画面サイズに依存しない)
    const canvasElementRatio = canvasRef.current!.clientWidth / canvasSize.width;
    const rect = canvasRef.current?.getBoundingClientRect();
    // canvas上でのマウスの座標を定義
    const clientCanvasX = Math.trunc((e.clientX - Math.floor(rect!.left)) / canvasElementRatio);
    const clientCanvasY = Math.trunc((e.clientY - Math.floor(rect!.top)) / canvasElementRatio);

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
    viewingRoomId,
    popoverRoom,
    displayPopover,
  };
};
