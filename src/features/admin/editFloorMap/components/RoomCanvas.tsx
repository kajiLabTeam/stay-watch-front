'use client';
import React, { useEffect, useRef, RefObject } from 'react';
import { useUserRoleState } from '@/globalStates/userRoleState';

export const RoomCanvas = (props: { color: string; polygon: number[][]; roomID: number }) => {
  const userRole = useUserRoleState();
  const canvasRef: RefObject<HTMLCanvasElement> = useRef(null); // RefObjectの型をHTMLCanvasElementに指定する

  const CANVAS_WIDTH = 2880;
  const CANVAS_HEIGHT = 1800;

  const getContext = (): CanvasRenderingContext2D => {
    const canvas: HTMLCanvasElement | null = canvasRef.current;
    return canvas?.getContext('2d') as CanvasRenderingContext2D; // キャスト演算子を使用して型を明確にする
  };

  useEffect(() => {
    const ctx: CanvasRenderingContext2D = getContext();
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.beginPath();
    ctx.fillStyle = props.color;
    ctx.fillRect(
      props.polygon[0][0],
      props.polygon[0][1],
      props.polygon[1][0] - props.polygon[0][0],
      props.polygon[1][1] - props.polygon[0][1],
    );
  });

  if (userRole == null) {
    return <div />;
  }

  return (
    <div className='absolute'>
      <canvas className='w-full' ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
    </div>
  );
};
