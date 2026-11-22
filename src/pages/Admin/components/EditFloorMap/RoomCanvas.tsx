import React from 'react';
import { useUserRoleState } from '@/atoms/userRoleAtom';

export const RoomCanvas = (props: {
  color: string;
  polygon: number[][];
  roomID: number;
  canvasWidth: number;
  canvasHeight: number;
}) => {
  const userRole = useUserRoleState();

  // 描画内容は props から決まるため、canvas の ref コールバックで描画する
  const drawRoom = (canvas: HTMLCanvasElement | null): void => {
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, props.canvasWidth, props.canvasHeight);
    ctx.beginPath();
    ctx.fillStyle = props.color;
    ctx.fillRect(
      props.polygon[0][0],
      props.polygon[0][1],
      props.polygon[1][0] - props.polygon[0][0],
      props.polygon[1][1] - props.polygon[0][1],
    );
  };

  if (userRole == null) {
    return <div />;
  }

  return (
    <div className='absolute'>
      <canvas
        className='w-full'
        ref={drawRoom}
        width={props.canvasWidth}
        height={props.canvasHeight}
      />
    </div>
  );
};
