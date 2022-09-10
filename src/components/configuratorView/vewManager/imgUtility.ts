//定义视图管理器中的原始只读数据，包括三部分，图片的canvas，图片非零值的区域和非零值的序列；
import axios from "axios"
export interface imgData {
    imgCanvas: HTMLCanvasElement,
    loc: number[],
    val: number[]
}

//提取已经下载的图片的数据信息，传入一个图像对象，返回imgData；
function extractImgData(img: HTMLImageElement): imgData {
    let imgCanvas: HTMLCanvasElement = document.createElement("canvas");
    let loc: number[] = [];
    let val: number[] = [];
    let inRange = false;
    imgCanvas.height = 900;
    imgCanvas.width = 900;

    let ctx: CanvasRenderingContext2D = imgCanvas.getContext('2d')!;
    ctx.drawImage(img, 0, 0);
    let imgData: Uint8ClampedArray = ctx.getImageData(0, 0, 900, 900).data!;
    let imgDataLength: number = imgData.length;


    for (let i = 0; i < imgDataLength; i += 4) {
        const alphaValue = imgData[i];

        if (alphaValue === 0) {
            if (inRange) {
                loc.push(i - 4);
            }
            inRange = false;
        }
        else {
            const grayValue = imgData[i];
            val.push(grayValue);
            if (!inRange) {
                loc.push(i);
                inRange = true;
            }
        }
    }
    if (inRange) {
        loc.push(imgDataLength - 4);
    }
    return { imgCanvas, loc, val }
}

//根据传入的图片文件名下载图片，提取并返回该图片的imgData信息；
//函数的返回值是promise，imgData由该promise传出，可用then或await捕获；
async function getImageData(imgFileName: string): Promise<imgData> {
    return new Promise(
        (resolve) => {
            let img: HTMLImageElement = new Image();
            img.onload = (e) => {
                resolve(extractImgData(img));
            }
            img.src = `/${imgFileName}`;
            if(img.complete){
                resolve(extractImgData(img));
            }


        })
}

//将Canvas染色，传入该canvas对应的imgData和目标颜色，返回染好色的canvas
function changeCanvasColor(originalCanvasData: imgData, colorCode: string): HTMLCanvasElement {
    let { redMap, greenMap, blueMap } = getColorMap(colorCode);
    let { imgCanvas, loc, val } = originalCanvasData;
    // console.log(imgCanvas,originalCanvasData);

    let originImgData = imgCanvas.getContext('2d')?.getImageData(0, 0, 900, 900);
    let newCanvas = document.createElement('canvas');
    newCanvas.height = 900;
    newCanvas.width = 900;
    let newCanvasCtx = newCanvas.getContext('2d')
    newCanvasCtx!.putImageData(originImgData!, 0, 0);
    let newCanvasData = newCanvasCtx?.getImageData(0, 0, 900, 900);
    let pixelCounter = 0;
    for (let i = 0; i < loc.length;) {
        let [rangeStart, rangeEnd] = [loc[i], loc[i + 1]];
        i += 2;
        for (let j = rangeStart; j <= rangeEnd;) {
            let value = val[pixelCounter];
            pixelCounter += 1;
            newCanvasData!.data[j] = redMap[value];
            j += 1;
            newCanvasData!.data[j] = greenMap[value];
            j += 1;
            newCanvasData!.data[j] = blueMap[value];
            j += 2;
        }
    }
    newCanvasCtx?.putImageData(newCanvasData!, 0, 0);
    return newCanvas;

}

//原始灰度值与目标颜色的对应关系；
//染色通过混合原始灰度与目标颜色而得到最终的颜色值
function getColorMap(colorCode: string): { redMap: number[], greenMap: number[], blueMap: number[] } {
    let colorMapCache = {};
    if (colorCode in colorMapCache) {
        return colorMapCache[colorCode]
    }
    else {
        let { r, g, b } = getParsedColor(colorCode);
        let redMap: number[] = [];
        let greenMap: number[] = [];
        let blueMap: number[] = [];
        for (let i = 0; i < 256; i++) {
            redMap[i] = colorizeChannel(i, r);
            greenMap[i] = colorizeChannel(i, g);
            blueMap[i] = colorizeChannel(i, b);
        }
        colorMapCache[colorCode] = { redMap, greenMap, blueMap };
        return { redMap, greenMap, blueMap }
    }

}

//将#aabbcc的颜色代码转换成rgb
function getParsedColor(colorCode: string): { r: number, g: number, b: number } {
    return {
        r: parseInt(colorCode.substring(0, 2), 16),
        g: parseInt(colorCode.substring(2, 4), 16),
        b: parseInt(colorCode.substring(4, 6), 16),
    }
}

//染色算法
function colorizeChannel(base, blend) {
    const baseRatio = base / 255;
    const blendRatio = blend / 255;

    if (baseRatio > 0.5) {
        return Math.floor((1 - (1 - 2 * (baseRatio - 0.5)) * (1 - blendRatio)) * 255);
    }
    return Math.floor((2 * baseRatio * blendRatio) * 255);
}

export { getImageData, changeCanvasColor }