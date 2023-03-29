import React, { useEffect, useRef } from 'react';
import {
  useEditingMapMutators,
  useEditingMapState,
} from '@/features/admin/editFloorMap/hooks/editingMapState';

export const EditingPolygonCanvas = () => {
  const { isEditingRoom } = useEditingMapState();
  const { setEditingPolygon } = useEditingMapMutators();

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const CANVAS_WIDTH = 2880;
  const CANVAS_HEIGHT = 1800;
  const MOUSE_DRAWING = 1;
  const MOUSE_NOT_DRAWING = 0;

  const drawSquare = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    drawingCanvas: CanvasRenderingContext2D,
  ) => {
    drawingCanvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    drawingCanvas.fillStyle = 'red';
    drawingCanvas.fillRect(x1, y1, x2 - x1, y2 - y1);
  };

  useEffect(() => {
    const canvasElement = canvasRef.current;
    const drawingCanvas = canvasRef.current?.getContext('2d');

    if (!drawingCanvas) return;

    if (!isEditingRoom) {
      drawingCanvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }

    if (canvasElement) {
      let startX = 0;
      let startY = 0;
      let endX = 0;
      let endY = 0;
      let mouseMode = MOUSE_NOT_DRAWING;
      let canvasElementRatio: number = canvasElement.clientWidth / CANVAS_WIDTH; // キャンバスサイズとウィンドウによって変わる要素サイズの比率

      if (isEditingRoom) {
        canvasElement.onclick = (e) => {
          canvasElementRatio = canvasElement.clientWidth / CANVAS_WIDTH;

          let rect = canvasElement.getBoundingClientRect();

          if (mouseMode === MOUSE_DRAWING) {
            // 四角の終了
            // 四角の終点を定める
            endX = Math.trunc((e.clientX - Math.floor(rect.left)) / canvasElementRatio);
            endY = Math.trunc((e.clientY - Math.floor(rect.top)) / canvasElementRatio);
            //console.log("部屋の範囲：" + startX + "," + startY + "-" + endX + "," + endY);
            mouseMode = MOUSE_NOT_DRAWING;
            setEditingPolygon([
              [startX, startY],
              [endX, endY],
            ]);
          } else if (mouseMode === MOUSE_NOT_DRAWING) {
            // 四角の開始
            // 四角の始点を定める
            startX = Math.trunc((e.clientX - Math.floor(rect.left)) / canvasElementRatio);
            startY = Math.trunc((e.clientY - Math.floor(rect.top)) / canvasElementRatio);
            mouseMode = MOUSE_DRAWING;
          }
        };
        canvasElement.onmousemove = (e) => {
          if (mouseMode === MOUSE_NOT_DRAWING) {
            // 四角かいていない時
          } else if (mouseMode === MOUSE_DRAWING) {
            // 四角を描いている途中
            canvasElementRatio = canvasElement.clientWidth / CANVAS_WIDTH;
            let rect = canvasElement.getBoundingClientRect();
            let canvasPositionX = Math.trunc(
              (e.clientX - Math.floor(rect.left)) / canvasElementRatio,
            );
            let canvasPositionY = Math.trunc(
              (e.clientY - Math.floor(rect.top)) / canvasElementRatio,
            );
            drawSquare(startX, startY, canvasPositionX, canvasPositionY, drawingCanvas);
          }
        };
      }
    }
  });

  return (
    <div className='absolute'>
      <canvas className='w-full' ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
    </div>
  );
};
