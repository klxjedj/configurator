import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { switchToNextView } from "../../store/slices/viewSlice";
import { useEffect, useRef } from "react";
import configuratorViewManager from "./vewManager/viewManager";
import { store } from "../../store/store";
import { changeLoadingStatus } from "../../store/slices/loadingStatusSlice";

export enum Color {
    A = '#aa0000',
    B = '#00aa00',
}

const colorList = ['#aa0000', '#00aa00', '#0000aa', '#aa00aa', '#aaaa00', '#00aaaa', '#aaaaaa']
let viewManager = new configuratorViewManager();

const s = async () => {
    await viewManager.initialize();
    store.dispatch(changeLoadingStatus())
};
s();

export function Configure() {

    const currentView = useAppSelector((state) => state.view);
    const currentLoadingStatus = useAppSelector((state) => state.loadingStatus)
    const config = useAppSelector((state) => state.config);

    const myCanvas = useRef<null | HTMLCanvasElement>(null);

    const dispatch = useAppDispatch()

    let currentColor = colorList[currentView - 1];

    const nextView = (e) => {
        let colorChangedCanvas = viewManager.getColorChangedCompCanvas(1, currentColor)[1];
        let imgData = colorChangedCanvas.getContext('2d')?.getImageData(0, 0, 900, 900)
        const myCanvasCtx = myCanvas.current!.getContext('2d');

        myCanvasCtx!.putImageData(imgData!, 0, 0);
        dispatch(switchToNextView())
    }

    useEffect(() => {
    }, [currentLoadingStatus]);

    useEffect(() => {
        if (currentLoadingStatus !== "loading") {

            console.log(currentLoadingStatus)
            const myCanvasCtx = myCanvas.current!.getContext('2d');
            myCanvasCtx?.drawImage(viewManager.getViewCanvas(currentView), 0, 0);

            let currentColorizedView = viewManager.getColorChangedCompCanvas(1, currentColor)[currentView];
            myCanvasCtx?.drawImage(currentColorizedView, 0, 0);

            // let imgData=currentColorizedView.getContext('2d')?.getImageData(0,0,900,900);
            // myCanvasCtx?.putImageData(imgData!,0,0);

            // let imgData=viewManager.getImgData();
            // imgData![currentView].map((compData)=>{
            //     document.body.appendChild(compData.imgCanvas);
            //     return 
            // })

            // let originViewData = viewManager.getViewCanvas(currentView).getContext('2d')?.getImageData(0, 0, 900, 900);

            // myCanvasCtx!.putImageData(originViewData!, 0, 0)
        }

    }, [currentLoadingStatus, currentView,currentColor])

    return currentLoadingStatus === "loading" ? <div>Loading...</div> : ((
        <div>
            <div >current view: {currentColor}</div>
            <div style={{ backgroundColor: currentColor }}>config:{
                Object.keys(config).map(
                    (key) =>
                        <p key={key}>{key}:{config[key]}</p>)} </div>
            <div><button onClick={nextView}>Next View</button></div>
            <div><canvas ref={myCanvas} width={900} height={900} /></div>
        </div>));
}



