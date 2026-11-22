import React from 'react';

import { useEditingMapState } from '@/atoms/editingMapAtom';
import { useEditingPolygonCanvas } from '@/features/admin/editFloorMap/hooks/useEditingPolygonCanvas';

type Props = { canvasWidth: number; canvasHeight: number };

// 編集モードが切り替わるたびに作り直し、キャンバスの描画と描画中の状態をリセットする
export const EditingPolygonCanvas = (props: Props) => {
  const { isEditingRoom } = useEditingMapState();
  return <EditingPolygonCanvasInner key={String(isEditingRoom)} {...props} />;
};

const EditingPolygonCanvasInner = (props: Props) => {
  const { canvasRef, onClick, onMouseMove } = useEditingPolygonCanvas(
    props.canvasWidth,
    props.canvasHeight,
  );

  return (
    <div className='absolute'>
      <canvas
        className='w-full'
        ref={canvasRef}
        onClick={onClick}
        onMouseMove={onMouseMove}
        width={props.canvasWidth}
        height={props.canvasHeight}
      />
    </div>
  );
};
