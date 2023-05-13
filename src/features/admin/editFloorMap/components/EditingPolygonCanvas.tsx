import React from 'react';

import { useEditingPolygonCanvas } from '@/features/admin/editFloorMap/hooks/useEditingPolygonCanvas';

export const EditingPolygonCanvas = () => {
  const { canvasRef, CANVAS_HEIGHT, CANVAS_WIDTH } = useEditingPolygonCanvas();

  return (
    <div className='absolute'>
      <canvas className='w-full' ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
    </div>
  );
};
