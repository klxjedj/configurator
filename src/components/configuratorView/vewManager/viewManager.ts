import { getColorMap } from "./imgUtility";



class configuratorViewManager {

    //绘制指定视图的合成画布
    public getViewCanvas(viewIndex): HTMLCanvasElement {
        let viewCanvas = document.createElement('canvas');
        viewCanvas.width = 900;
        viewCanvas.height = 900;

        let ctx = viewCanvas.getContext('2d');
        for (let compIndex in window.imgLocation[viewIndex])
            ctx?.drawImage(this.getCompCanvas(viewIndex, compIndex), 0, 0)

        return viewCanvas
    }

    //将指定视图的部件还原为canvas图片
    public getCompCanvas(viewIndex, compIndex, colorCode:string|null= null): HTMLCanvasElement {
        

        let { redMap, greenMap, blueMap } =colorCode? getColorMap(colorCode):{redMap:null,greenMap:null,blueMap:null};

        let compCanvas = document.createElement('canvas')
        compCanvas.width = 900;
        compCanvas.height = 900;
        let ctx = compCanvas.getContext('2d');
        let data = ctx!.getImageData(0, 0, 900, 900);
        let currentImgLocData = window.imgLocation[viewIndex][compIndex];
        let currentImgValData = window.imgValue[viewIndex][compIndex]
        let currentImgAlfData = window.imgAlpha[viewIndex][compIndex]
        for (let i = 0; i < currentImgLocData.length; i++) {
            let location = currentImgLocData[i] * 4;
            data.data[location] = colorCode ? redMap![currentImgValData[i]] : currentImgValData[i]
            data.data[location + 1] = colorCode ? greenMap![currentImgValData[i]] : currentImgValData[i]
            data.data[location + 2] = colorCode ? blueMap![currentImgValData[i]] : currentImgValData[i]
            data.data[location + 3] = currentImgAlfData[i]
        }

        ctx!.putImageData(data, 0, 0)
        return compCanvas
    }

    //对特定comp的所有视图进行染色，返回染色的canvas视图列表
    public getColorizedCompCanvas(compId: number, viewIndex: number, colorCode: string): HTMLCanvasElement {

        return this.getCompCanvas(viewIndex, compId, colorCode);


    }
}


export default configuratorViewManager;