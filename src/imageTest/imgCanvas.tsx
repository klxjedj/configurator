import { createElement, useRef } from "react";

export function ImageCanvas(){

    let img=new Image()
    img.src='http://localhost:3000/nikeid/v1_sg4.png'

    let mycanvas=useRef(null);
    if(mycanvas.current){
        let ctx=(mycanvas.current as HTMLCanvasElement).getContext('2d')
        
        img.onload=()=>{
            let originCanvas=document.createElement('canvas');
            originCanvas.width=900;
            originCanvas.height=900;
            let newCtx=originCanvas.getContext('2d');
            newCtx!.drawImage(img,0,0);
            let data=newCtx!.getImageData(0,0,900,900);
            ctx?.drawImage(originCanvas,0,0);
            // ctx!.fillStyle="rgba(255,255,255,255)";
            // ctx?.fillRect(0,0,900,900);
            // let data=ctx?.getImageData(0,0,900,900).data
            // console.log(data)

        
        }
    }

    return <div style={{backgroundColor:'grey'}}><canvas ref={mycanvas} width='900' height='900'></canvas></div>
}