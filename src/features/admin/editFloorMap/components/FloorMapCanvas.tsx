'use client';
import { useRef, useEffect } from 'react';

export const FloorMapCanvas = (props: {
  buildingImagePath: string;
  canvasWidth: number;
  canvasHeight: number;
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null); // canvasRef の型を MutableRefObject<HTMLCanvasElement | null> に指定

  const getContext = (): CanvasRenderingContext2D | null => {
    const canvas: HTMLCanvasElement | null = canvasRef.current; // canvas の型を HTMLCanvasElement | null に指定

    return canvas ? canvas.getContext('2d') : null;
  };

  useEffect(() => {
    // buildingImagePathが変わった時に再レンダリング

    const buildingImage = new Image();
    const ctx: CanvasRenderingContext2D | null = getContext(); // ctx の型を CanvasRenderingContext2D | null に指定
    if (ctx) {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, props.canvasWidth, props.canvasHeight);
      ctx.strokeRect(0, 0, props.canvasWidth, props.canvasHeight);
    }
    buildingImage.src = `/floor_maps${props.buildingImagePath}`;

    function drawBuildingToCanvas(buildingImage: HTMLImageElement) {
      if (ctx) {
        ctx.fillStyle = 'gray';
        ctx.strokeRect(0, 0, props.canvasWidth, props.canvasHeight);
        ctx.drawImage(
          buildingImage,
          1,
          1,
          buildingImage.width * (props.canvasHeight / buildingImage.height),
          buildingImage.height * (props.canvasHeight / buildingImage.height),
        );
      }
    }

    buildingImage.onload = () => {
      drawBuildingToCanvas(buildingImage);
    };
  }, [props.buildingImagePath, props.canvasWidth, props.canvasHeight]);

  return (
    <div className='absolute border-x-4 border-b-4'>
      <canvas
        id='canvas'
        className='w-full'
        ref={canvasRef}
        width={props.canvasWidth}
        height={props.canvasHeight}
      />
    </div>
  );
};
