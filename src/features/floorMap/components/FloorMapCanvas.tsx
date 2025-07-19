'use client';
import { useDocumentTitle } from '@mantine/hooks';
import React from 'react';
import { useFloorMapCanvas } from '../hooks/useFloorMapCanvas';
import * as FloorMapComponents from '@/features/floorMap/components/Index';

export const FloorMapCanvas = () => {
  useDocumentTitle('滞在者マップ');
  const { CANVAS_WIDTH, CANVAS_HEIGHT, canvasRef, viewingRoomId, popoverRoom, displayPopover } =
    useFloorMapCanvas();

  return (
    <div className='mb-80 mt-3 border'>
      <canvas
        id='canvas'
        className='w-full'
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        onMouseMove={displayPopover}
      />
      {viewingRoomId !== 0 && canvasRef.current && popoverRoom && (
        <div
          className='absolute align-bottom text-red-400'
          style={{
            // ポップオーバーの位置、フォントサイズ
            left: popoverRoom.left + popoverRoom.left / 40,
            top: popoverRoom.top - popoverRoom.top / 20,
            fontSize: canvasRef.current.clientHeight / 40,
          }}
        >
          <FloorMapComponents.PopoverUser
            roomName={popoverRoom.roomName}
            userNames={popoverRoom.userNames}
          />
        </div>
      )}
    </div>
  );
};
