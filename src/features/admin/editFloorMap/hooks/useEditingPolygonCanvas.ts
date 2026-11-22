import { useRef } from 'react';
import type { MouseEvent } from 'react';
import {
  useEditingMapMutators,
  useEditingMapState,
} from '@/features/admin/editFloorMap/globalstate/editingMapState';

export const useEditingPolygonCanvas = (canvasWidth: number, canvasHeight: number) => {
  const { isEditingRoom } = useEditingMapState();
  const { setEditingPolygon } = useEditingMapMutators();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const start = useRef({ x: 0, y: 0 });

  // マウス座標をキャンバス座標に変換する（表示サイズはウィンドウによって変わるため比率で補正）
  const toCanvasPosition = (e: MouseEvent<HTMLCanvasElement>) => {
    const element = e.currentTarget;
    const ratio = element.clientWidth / canvasWidth;
    const rect = element.getBoundingClientRect();
    return {
      x: Math.trunc((e.clientX - Math.floor(rect.left)) / ratio),
      y: Math.trunc((e.clientY - Math.floor(rect.top)) / ratio),
    };
  };

  const onClick = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!isEditingRoom) return;
    const pos = toCanvasPosition(e);

    if (isDrawing.current) {
      // 四角の終了
      isDrawing.current = false;
      setEditingPolygon([
        [start.current.x, start.current.y],
        [pos.x, pos.y],
      ]);
    } else {
      // 四角の開始
      start.current = pos;
      isDrawing.current = true;
    }
  };

  const onMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!isEditingRoom || !isDrawing.current) return;
    const ctx = e.currentTarget.getContext('2d');
    if (!ctx) return;
    const pos = toCanvasPosition(e);

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = 'red';
    ctx.fillRect(
      start.current.x,
      start.current.y,
      pos.x - start.current.x,
      pos.y - start.current.y,
    );
  };

  return { canvasRef, onClick, onMouseMove };
};
