import { imgData } from ".";
// import axios from "axios";
function extractImgData(Img: HTMLImageElement): imgData {
    return { loc: [0, 0], val: [0, 0] }
}

// function getImgData(imgFileName:string):imgData{
//     return extractImgData()
// }

async function getImageData(imgFileName: string): Promise<imgData> {
    return new Promise(
        (resolve) => {
            let img: HTMLImageElement = new Image();
            img.src = `/${imgFileName}`;
            img.onload = () => {
                resolve(extractImgData(img))
            }
        })
}

export { getImageData }