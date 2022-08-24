import { getImageData } from "./utility";
export interface imgData {
    loc: number[];
    val: number[]
}

class configuratorViewManager {

    private imgData;

    getImgData() {
        return this.imgData;
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
            return res
        })
    }
}


export default configuratorViewManager;