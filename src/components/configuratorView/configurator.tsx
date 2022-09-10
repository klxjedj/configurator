import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { switchToNextView } from "../../store/slices/viewSlice";
import { useEffect, useRef, useLayoutEffect } from "react";
import configuratorViewManager from "./vewManager/viewManager";
import { store } from "../../store/store";
import { attrSelected } from "../../store/slices/attrSlice";
import { optionSelected } from "../../store/slices/optionSlice";
import loadingStatusSlice, { changeLoadingStatus } from "../../store/slices/loadingStatusSlice";
import { MaxView } from "../../store/Constant";
import "./configurator.css"

const attrData = window.initState['attrData']

let viewManager = new configuratorViewManager();

const s = async () => {
    await viewManager.initialize();
    store.dispatch(changeLoadingStatus())
};

s();


export function Configure() {



    const currentView = useAppSelector((state) => state.view);
    const currentAttr: number | null = useAppSelector((state) => state.selectedAttr);
    const currentOption = useAppSelector((state) => state.selectedOption)
    const currentLoadingStatus = useAppSelector((state) => state.loadingStatus)
    const config = useAppSelector((state) => state.config);
    const dispatch = useAppDispatch()
    const canvasDiv = useRef(null);
    const displaycurrentOption = useRef(null);
    const myCanvasDiv = canvasDiv.current! as HTMLDivElement;


 






    //初始化canvas
    useEffect(() => {
        if (myCanvasDiv) {
            console.log(myCanvasDiv)
            console.log(myCanvasDiv.children)
            if (currentLoadingStatus !== 'loading') {
                let canvasList = myCanvasDiv.children;
                for (let i = 0; i <= MaxView; i++) {
                    let canvasCtx = (canvasList[i] as HTMLCanvasElement).getContext('2d');
                    canvasCtx?.drawImage(viewManager.getViewCanvas(i), 0, 0);
                }
            }
        }
    }, [currentLoadingStatus]);


    //通过滑动切换view，取决于bootstrap中相应组件如何定义，不一定使用此副作用
    useEffect(() => {
    }, [currentView])

    // 染色程序；
    useEffect(() => {
        (displaycurrentOption.current! as HTMLDivElement).innerHTML = "";

        if (currentLoadingStatus !== "loading") {

            console.log("configurator currentAttrIndex:", currentAttr);
            console.log("configurator currentOptionIndex:", currentOption);
            let canvasList = myCanvasDiv.children;
            for (let compId in attrData[currentAttr]["options"][currentOption]["config"]) {
                let colorCode = attrData[currentAttr]["options"][currentOption]["config"][compId]
                for (let i = 0; i <= MaxView; i++) {

                    let currentColorizedView = viewManager.getColorChangedCompCanvasView(parseInt(compId), i, colorCode);
                    // (displaycurrentOption.current! as HTMLDivElement).appendChild(currentColorizedView[0])
                    if (i == 0) {
                        (displaycurrentOption.current! as HTMLDivElement).appendChild(currentColorizedView)

                    }
                    let canvasCtx = (canvasList[i] as HTMLCanvasElement).getContext('2d');
                    canvasCtx?.drawImage(currentColorizedView, 0, 0);
                }
            }
        }
    }, [currentOption,currentAttr])

    return ((
        <div>
            <div ref={displaycurrentOption} ></div>
            <hr></hr>
            <div style={{ display: currentLoadingStatus === "loading" ? "none" : "inherit" }} ref={canvasDiv}>


                <canvas key={1} width={900} height={900} />
                <canvas key={2} width={900} height={900} />
                <canvas key={3} width={900} height={900} />
                <canvas key={4} width={900} height={900} />
                <canvas key={5} width={900} height={900} />
                <canvas key={6} width={900} height={900} />
                <canvas key={7} width={900} height={900} />
            </div>
            {currentLoadingStatus === "loading" ? <div>Loading</div> : null}
            <div>current Loading Status:{currentLoadingStatus}</div>
            <div>selected attr:{currentAttr}</div>
            <div>current option:{currentOption}</div>
        </div>));
}



