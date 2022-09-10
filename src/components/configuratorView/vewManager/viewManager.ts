import { getImageData } from "./imgUtility";
import { imgData, changeCanvasColor } from "./imgUtility";


class configuratorViewManager {

    private imgData: imgData[][] | null = null
    private viewCanvasList: HTMLCanvasElement[] | null = null;

    //返回所有图片数据
    public getImgData(): imgData[][] | null {
        return this.imgData;
    }

    //返回指定视图的合成canvas
    public getViewCanvas(viewIndex: number): HTMLCanvasElement {
        return this.viewCanvasList![viewIndex]
    }

    //返回所有视图的canvas列表；
    public getViewCanvasList(): HTMLCanvasElement[] {
        return this.viewCanvasList!;
    }

    //初始化任务构建
    private constructPromiseTask(): Promise<imgData[]>[] {
        let taskCollection: Promise<imgData>[][] = []
        for (let i = 0; i < window.initState["viewData"].length; i++) {
            let taskList: Promise<imgData>[] = []
            for (let j = 0; j < window.initState["viewData"][0].length; j++) {
                taskList.push(getImageData('nikeid/' + window.initState['viewData'][i][j]['imgFileName']))

            }
            taskCollection.push(taskList)
        }
        let pList: Promise<imgData[]>[] = []
        for (let i = 0; i < taskCollection.length; i++) {
            let p = new Promise<Array<imgData>>((resolve) => {
                Promise.all(taskCollection[i]).then((res) => {
                    resolve(res);
                })

            })
            pList.push(p);

        }
        return pList;
    }

    //执行初始化任务
    public initialize() {
        return Promise.all(this.constructPromiseTask()).then((res) => {
            this.imgData = res;
            this.viewCanvasList = this.imgData.map((viewData) => {
                return this.getMergedViewCanvas(viewData)
            })
            console.log('initialization finished')
            return res
        })
    }

    //对特定comp的所有视图进行染色，返回染色的canvas视图列表
    public getColorChangedCompCanvasView(compId: number, viewIndex: number, colorCode: string): HTMLCanvasElement {

        return changeCanvasColor(this.imgData![viewIndex][compId], colorCode);


    }

    //利用视图数据数组中的imgdata生成合成的视图canvas
    private getMergedViewCanvas(viewData): HTMLCanvasElement {
        let viewCanvas = document.createElement('canvas');
        viewCanvas.width = 900;
        viewCanvas.height = 900;
        let viewCanvasCtx = viewCanvas.getContext('2d')
        viewData.map((compData) => {
            viewCanvasCtx!.drawImage(compData.imgCanvas, 0, 0);
            return null
        })
        return viewCanvas
    }
}


export default configuratorViewManager;