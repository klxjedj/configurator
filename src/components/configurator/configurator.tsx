import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { switchToNextView } from "../../store/slices/viewSlice";
import { useEffect, useRef } from "react";
import configuratorViewManager from "./vewManager";

const colorList = ['#aa0000', '#00aa00', '#0000aa', '#aa00aa', '#aaaa00', '#00aaaa', '#aaaaaa']
let viewManager = new configuratorViewManager();

viewManager.initialize()

export function Configure() {

    const currentView = useAppSelector((state) => state.view);
    const config = useAppSelector((state) => state.config);
    const myCanvas = useRef<null | HTMLCanvasElement>(null);
    let currentColor = colorList[currentView - 1];
    const dispatch = useAppDispatch()

    const nextView = (e) => {
        dispatch(switchToNextView())
        console.log(viewManager.getImgData())
    }

    useEffect(() => {
        // if(myCanvas.current){
        let ctx = myCanvas.current?.getContext('2d') as CanvasRenderingContext2D;
        ctx.fillStyle = currentColor;
        ctx.fillRect(0, 0, 200, 200);
        // }
    }, [currentColor]);

    return (
        <div>
            <div >current view: {currentColor}</div>
            <div style={{ backgroundColor: currentColor }}>config:{
                Object.keys(config).map(
                    (key) =>
                        <p key={key}>{key}:{config[key]}</p>)} </div>
            <button onClick={nextView}>Next View</button>
            <canvas ref={myCanvas} width={200} height={200} />
        </div>)
}