import { useRef, useEffect } from 'react';

export const FloorMapCanvas = (props: { buildingImagePath: string }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null); // canvasRef の型を MutableRefObject<HTMLCanvasElement | null> に指定
  const CANVAS_WIDTH = 2880;
  const CANVAS_HEIGHT = 1800;

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
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.strokeRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
    buildingImage.src = `/floor_maps${props.buildingImagePath}`;

    function drawBuildingToCanvas(buildingImage: HTMLImageElement) {
      if (ctx) {
        ctx.fillStyle = 'gray';
        ctx.strokeRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.drawImage(
          buildingImage,
          1,
          1,
          buildingImage.width * (CANVAS_HEIGHT / buildingImage.height),
          buildingImage.height * (CANVAS_HEIGHT / buildingImage.height),
        );
      }
    }

    buildingImage.onload = () => {
      drawBuildingToCanvas(buildingImage);
    };
  }, [props.buildingImagePath]);

  return (
    <div className='absolute border-x-4 border-b-4'>
      <canvas
        id='canvas'
        className='w-full'
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
      />
    </div>
  );
};