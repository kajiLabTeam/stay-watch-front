import { useRef, useEffect } from "react";
import { useUserRole } from "@/utils/Auth";

export const FloorMapCanvas = (props: {
  buildingImagePath:string
}) => {
    
    const canvasRef = useRef(null);
    const userRole = useUserRole();

    const CANVAS_WIDTH = 2880
    const CANVAS_HEIGHT = 1800

    const getContext = (): CanvasRenderingContext2D => {
        const canvas: any = canvasRef.current;

        return canvas.getContext('2d');
    };

    useEffect(() => { // buildingImagePathが変わった時に再レンダリング

        const buildingImage = new Image();
        const ctx: CanvasRenderingContext2D = getContext();
        ctx.fillStyle = "white";
        ctx.fillRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.strokeRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        buildingImage.src = "/floor_maps" + props.buildingImagePath;

        function drawBuildingToCanvas(buildingImage: HTMLImageElement){
            ctx.fillStyle = "gray";
            ctx.strokeRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            ctx.drawImage(buildingImage,1,1,buildingImage.width*(CANVAS_HEIGHT/buildingImage.height), buildingImage.height*(CANVAS_HEIGHT/buildingImage.height)); 
        }

        buildingImage.onload = () => {
            drawBuildingToCanvas(buildingImage);
        }

    },[props.buildingImagePath])

  if (userRole == null) {
    return <div />;
  }


  return (
    <div className="absolute">
        <canvas id="canvas" className="w-full" ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT}/>
    </div>
  );
};