// import axios from "axios";
// import Image from "next/image";
// import { useRef, useEffect, useState } from "react";
// import { SizeMe } from "react-sizeme";
// import PopoverTop from "@/components/roomHistory/PopoverTop";
// import RoomInformation from "@/types/roomInformation";
// import RoomStatus from "@/types/roomStatus";
// import { baseURL } from "@/utils/api";
import React, {useEffect, useRef} from 'react';

// const fetcher = async (url: string) => {
//   const res = await fetch(url);
//   const obj = res.json();
// };

const CANVAS_WIDTH = 2880
const CANVAS_HEIGHT = 1800
const MOUSE_DRAWING = 1;
const MOUSE_AWAY = 0;

function Canvas() {
  const canvasRef = useRef(null);
  //console.log("aaaaa");

  const getContext = (): CanvasRenderingContext2D => {
    const canvas: any = canvasRef.current;

    return canvas.getContext('2d');
  };

  useEffect(() => {


    const bildingimg_4a = new Image();
    const ctx: CanvasRenderingContext2D = getContext();
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.strokeRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    bildingimg_4a.src = "/4goukanbekkan.jpg";
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;

    var mouseMode = 0;

    // window.onload= () => {
    //   //const canvas = <HTMLInputElement>document.getElementById('canvas');
    //   const personName = document.getElementById("test");
    //   console.log(personName);
    // }

    //console.log("aaaa");

    bildingimg_4a.onload = () => {
      ctx.drawImage(bildingimg_4a,1,1,bildingimg_4a.width*1.3, bildingimg_4a.height*1.3);

      const canvas = document.getElementById('canvas');
      if(canvas != null){
        var point_start_x = 0;
        var point_start_y= 0;
        var point_finish_x = 0;
        var point_finish_y = 0;

        if(document.getElementById('canvas') != null){
            var canvas_with_windowsize_width = document.getElementById('canvas').clientWidth;
            var canvas_with_windowsize_height = canvas_with_windowsize_width * (CANVAS_HEIGHT/CANVAS_WIDTH)
            var scale_canvassize = canvas_with_windowsize_width / CANVAS_WIDTH; // 内部のキャンバスサイズとウィンドウによって変わるキャンバスサイズの比率
        }

        // canvas.onclick = (e) => {
        //   if(e.target)
        // }

        canvas.onclick = (e) => {
            if(e.target != null){
                // canvas_with_windowsize_width = document.getElementById('canvas').clientWidth;
                // canvas_with_windowsize_height = canvas_with_windowsize_width * (CANVAS_HEIGHT/CANVAS_WIDTH)
                scale_canvassize = document.getElementById('canvas').clientWidth / CANVAS_WIDTH;

                var rect = e.target.getBoundingClientRect();
                console.log("ウィンドウサイズ高さ：" + window.innerHeight);
                console.log("ウィンドウサイズ幅：" + window.innerWidth);

                // console.log("キャンバスサイズ高さ：" + canvas_with_windowsize_height);
                // console.log("キャンバスサイズ幅：" + canvas_with_windowsize_width);
                console.log("キャンバス縮度：" + scale_canvassize);

                if(mouseMode == MOUSE_DRAWING){     // 四角をドラッグ中
                    point_finish_x = (e.clientX - Math.floor(rect.left)) / scale_canvassize;
                    point_finish_y = (e.clientY - Math.floor(rect.top)) / scale_canvassize;

                    ctx.fillStyle = "red";
                    ctx.fillRect(point_start_x, point_start_y, point_finish_x - point_start_x, point_finish_y - point_start_y);
                    mouseMode = MOUSE_AWAY;
                }else if(mouseMode == MOUSE_AWAY){  // 四角の視点を作成
                    point_start_x = (e.clientX - Math.floor(rect.left)) / scale_canvassize;
                    point_start_y = (e.clientY - Math.floor(rect.top)) / scale_canvassize;
                    mouseMode = MOUSE_DRAWING;
                }
            }
        }
        canvas.onmousemove = function(e){
          if(e.target != null){
            var rect = e.target.getBoundingClientRect();
            if(mouseMode == MOUSE_DRAWING){
              ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
              ctx.drawImage(bildingimg_4a,1,1,bildingimg_4a.width*1.3, bildingimg_4a.height*1.3);
    
              console.log("今canvasの上を動いていますyo");
              
              var mouseX = (e.clientX - Math.floor(rect.left)) / scale_canvassize;
              var mouseY = (e.clientY - Math.floor(rect.top)) / scale_canvassize;
              console.log("(x,y) = (" + mouseX + "," + mouseY + ")");
              ctx.fillStyle = "red";
              ctx.fillRect(point_start_x, point_start_y, mouseX - point_start_x, mouseY - point_start_y);
            }
          }
          // canvasgetCoordinates(canvas, event.clientX, event.clientY );
        }


      }
    }
  })
  function mouseMove(){
    console.log('MouseMove');
  }
  function canvasgetCoordinates($arg1, $arg2 ) {
    console.log("canvasgetCoorginates x:" + $arg1 + " y:" + $arg2);
    // canvas.innerHTML = "Ｘ座標：" + $arg1;
    // canvas.innerHTML = "Ｙ座標：" + $arg2;
   }
   function canvasclearCoordinates() {
    console.log("canvasgetCoorginates x: y:");
   }

  return (
    <div>

      <canvas id="canvas" className="canvas w-full" ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT}/>
      {/* <canvas id="canvas" className="canvas" ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT}/> */}
      <h1 id="test">ああああ</h1>
    </div>
  );
}

export default Canvas;