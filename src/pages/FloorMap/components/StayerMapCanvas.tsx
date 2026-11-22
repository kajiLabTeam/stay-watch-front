import { MouseEvent } from 'react';

interface StayerMapCanvasProps {
  width: number;
  height: number;
  onCanvasMounted: (canvas: HTMLCanvasElement | null) => void;
  onMouseMoved: (event: MouseEvent<HTMLCanvasElement>) => void;
}

export default function StayerMapCanvas({
  width,
  height,
  onCanvasMounted,
  onMouseMoved,
}: StayerMapCanvasProps) {
  return (
    <canvas
      id='canvas'
      className='w-full'
      ref={onCanvasMounted}
      width={width}
      height={height}
      onMouseMove={onMouseMoved}
    />
  );
}
