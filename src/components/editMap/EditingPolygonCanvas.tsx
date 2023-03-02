import React, {useEffect, useRef} from 'react';
import { useUserRole } from "@/utils/Auth";

export const EditingPolygonCanvas = (props:{
    editingPolygon: number[][],
    isEditingRoom: boolean,
    setEditingPolygon: React.Dispatch<React.SetStateAction<number[][]>>
}) => {

  const userRole = useUserRole();
  const canvasRef = useRef(null);

  const CANVAS_WIDTH = 2880
  const CANVAS_HEIGHT = 1800
  const MOUSE_DRAWING = 1;
  const MOUSE_NOT_DRAWING = 0;

//   console.log("CreatePolygonの出力");
//   console.log(props);
//   console.log("CreatePolygonの出力は以上");

  const getContext = (): CanvasRenderingContext2D => {
    const Canvas: any = canvasRef.current;
    return Canvas.getContext('2d');
  }

  const drawSquare = (x1:number, y1:number, x2:number, y2:number, ctx:CanvasRenderingContext2D) => {
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    ctx.fillStyle = "red";
    ctx.fillRect(x1,y1,x2-x1,y2-y1);
  }

  useEffect(() => {
    const canvas = document.getElementById('create-polygon-canvas');
    const ctx: CanvasRenderingContext2D = getContext();
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    ctx.fillStyle="red";
    // 最初にeditingPolygonの座標でポリゴンを描画
    ctx.fillRect(props.editingPolygon[0][0], props.editingPolygon[0][1], props.editingPolygon[1][0]-props.editingPolygon[0][0], props.editingPolygon[1][1]-props.editingPolygon[0][1]);
    ctx.fillStyle = "red";

    if(!props.isEditingRoom){
        ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    }


    if(canvas){
        var startX = 0;
        var startY= 0;
        var endX = 0;
        var endY = 0;
        var mouseMode = MOUSE_NOT_DRAWING;
        var elementWidth = canvas.clientWidth;
        var canvasElementRatio:number = elementWidth / CANVAS_WIDTH; // キャンバスサイズとウィンドウによって変わる要素サイズの比率

        canvas.onclick = (e) => {
            if(props.isEditingRoom){
                elementWidth = canvas.clientWidth;
                canvasElementRatio = elementWidth / CANVAS_WIDTH;
                
                var rect = canvas.getBoundingClientRect();
            
                if(mouseMode == MOUSE_DRAWING){     // 四角の終了
                    // 四角の終点を定める
                    endX = Math.trunc((e.clientX - Math.floor(rect.left)) / canvasElementRatio);
                    endY = Math.trunc((e.clientY - Math.floor(rect.top)) / canvasElementRatio);
                    //console.log("部屋の範囲：" + startX + "," + startY + "-" + endX + "," + endY);
                    mouseMode = MOUSE_NOT_DRAWING;
                    props.setEditingPolygon([[startX,startY], [endX, endY]]);
                }else if(mouseMode == MOUSE_NOT_DRAWING){  // 四角の開始
                    // 四角の始点を定める
                    startX = Math.trunc((e.clientX - Math.floor(rect.left)) / canvasElementRatio);
                    startY = Math.trunc((e.clientY - Math.floor(rect.top)) / canvasElementRatio);
                    mouseMode = MOUSE_DRAWING;
                }
            
            }
        }
        canvas.onmousemove = (e) => {
            if(props.isEditingRoom){
                if(mouseMode == MOUSE_NOT_DRAWING){  // 四角かいていない時
                    ;
                }else if(mouseMode == MOUSE_DRAWING){   // 四角を描いている途中
                    elementWidth = canvas.clientWidth;
                    canvasElementRatio = elementWidth / CANVAS_WIDTH;
                    var rect = canvas.getBoundingClientRect();
                    var canvasPosX = Math.trunc((e.clientX - Math.floor(rect.left)) / canvasElementRatio);
                    var canvasPosY = Math.trunc((e.clientY - Math.floor(rect.top)) / canvasElementRatio);
                    drawSquare(startX,startY,canvasPosX,canvasPosY,ctx);
                }
            }
        }
    }
  })

  if (userRole == null) {
    return <div />;
  }

  return (
    <div className="absolute">
        <canvas id="create-polygon-canvas" className="w-full" ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT}/>
    </div>
  );
};