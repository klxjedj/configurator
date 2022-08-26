import { getImageData } from "./imgUtility";
import { imgData,changeCanvasColor } from "./imgUtility";


class configuratorViewManager {

    private imgData:imgData[][]|null=null
    private viewCanvasList:HTMLCanvasElement[]|null=null;

    getImgData() {
        return this.imgData;
    }

    getViewCanvas(viewIndex){
        return this.viewCanvasList![viewIndex]
    }
    getViewCanvasList(){
        return this.viewCanvasList;
    }

    constructPromiseTask(): Promise<imgData[]>[] {
        let taskCollection: Promise<imgData>[][] = []
        for (let i = 0; i < window.initState["viewData"].length; i++) {
            let taskList: Promise<imgData>[] = []
            for (let j = 0; j < window.initState["compData"].length; j++) {
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

    initialize() {
        return Promise.all(this.constructPromiseTask()).then((res)=>{
            this.imgData=res;
            this.viewCanvasList=this.imgData.map((viewData)=>{
                return this.getMergedViewCanvas(viewData)
            })
            return res
        })
    }

    getColorChangedCompCanvas(compId:number,colorCode:string):HTMLCanvasElement[]{
        return this.imgData!.map((view)=>{
            let originalData=view[compId];
            return changeCanvasColor(originalData,colorCode);

        })
    }
    getMergedViewCanvas(viewData){
        let viewCanvas=document.createElement('canvas');
        viewCanvas.width=900;
        viewCanvas.height=900;
        let viewCanvasCtx=viewCanvas.getContext('2d')
        viewData.map((compData)=>{
            viewCanvasCtx!.drawImage(compData.imgCanvas,0,0);
            return null
        })
        return viewCanvas
    }
}


export default configuratorViewManager;