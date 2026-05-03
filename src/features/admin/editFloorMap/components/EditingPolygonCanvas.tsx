'use client';
import React from 'react';

import { useEditingPolygonCanvas } from '@/features/admin/editFloorMap/hooks/useEditingPolygonCanvas';

export const EditingPolygonCanvas = (props: { canvasWidth: number; canvasHeight: number }) => {
  const { canvasRef } = useEditingPolygonCanvas(props.canvasWidth, props.canvasHeight);

  return (
    <div className='absolute'>
      <canvas
        className='w-full'
        ref={canvasRef}
        width={props.canvasWidth}
        height={props.canvasHeight}
      />
    </div>
  );
};
