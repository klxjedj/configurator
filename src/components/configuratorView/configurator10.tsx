import { useAppSelector, useAppDispatch } from "../../store/hooks";
import axios from "axios";
import { switchToView } from "../../store/slices/viewSlice";
import { useEffect } from "react";
import configuratorViewManager from "./vewManager/viewManager";
import { MaxView } from "../../store/Constant";
import "./configurator.css"
import Carousel from "react-bootstrap/Carousel"


let viewManager = new configuratorViewManager();
window.viewManager = viewManager

export function Configure(props) {
    let { loaded } = props


    const currentView = useAppSelector((state) => state.view);
    const currentAttr: number | null = useAppSelector((state) => state.selectedAttr);
    const currentOption = useAppSelector((state) => state.selectedOption)
    const dispatch = useAppDispatch()

    function viewSelected(viewIndex) {
        axios.put('./api/action', {
            userTel: window.tel,
            timestamp: Date.now(),
            actionType: 'viewSelect',
            targetIndex: viewIndex
        });
        dispatch(switchToView(viewIndex));

    }

    // //初始化canvas
    useEffect(() => {
        if (loaded) {

            // let myCanvasDiv = document.getElementById('canvasDiv');

            // let canvasList = myCanvasDiv!.children;
            let canvasList = document.getElementsByClassName("myCanvas");
            for (let i = 0; i <= MaxView; i++) {
                let canvasCtx = (canvasList[i] as HTMLCanvasElement).getContext('2d');
                canvasCtx!.drawImage(viewManager.getViewCanvas(i + 1), 0, 0);
            }
        }
    }, []);

    // // 染色程序；
    useEffect(() => {
        const attrData = window.initState['attrData']

        let canvasList = document.getElementsByClassName('myCanvas');
        if (currentAttr !== null && currentOption !== null) {
            for (let compId in attrData[currentAttr]["options"][currentOption]["config"]) {
                let colorCode = attrData[currentAttr]["options"][currentOption]["config"][compId]
                for (let i = 0; i <= MaxView; i++) {
                    console.log(i, compId)

                    let currentColorizedView = viewManager.getColorizedCompCanvas(parseInt(compId), i + 1, colorCode);

                    let canvasCtx = (canvasList[i] as HTMLCanvasElement).getContext('2d');
                    canvasCtx?.drawImage(currentColorizedView, 0, 0);
                }
            }
        }

    }, [currentOption, currentAttr])

    return (
        <Carousel id='canvasDiv'
            activeIndex={currentView}
            onSelect={viewSelected}
            slide={true}
            variant='dark'
            indicatorLabels={['1', '2', '3', '4', '5', '6', '7']}
            indicators={true}
            interval={null}>
            <Carousel.Item><canvas className="myCanvas" key={1} width={900} height={900} /></Carousel.Item>
            <Carousel.Item><canvas className="myCanvas" key={2} width={900} height={900} /></Carousel.Item>
            <Carousel.Item><canvas className="myCanvas" key={3} width={900} height={900} /></Carousel.Item>
            <Carousel.Item><canvas className="myCanvas" key={4} width={900} height={900} /></Carousel.Item>
            <Carousel.Item><canvas className="myCanvas" key={5} width={900} height={900} /></Carousel.Item>
            <Carousel.Item><canvas className="myCanvas" key={6} width={900} height={900} /></Carousel.Item>
            <Carousel.Item><canvas className="myCanvas" key={7} width={900} height={900} /></Carousel.Item>
        </Carousel>
    );
}



