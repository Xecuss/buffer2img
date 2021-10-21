import { zlibSync } from "fflate";
import { readFile } from "./utils";

export default async function procFile(file: File) {
    // 原始arrayBuffer
    const buffer = await readFile(file);
    // 从arrayBuffer得到Uint8Array
    const rawData = new Uint8Array(buffer);
    //压缩
    const zipedData = zlibSync(rawData, { level: 9 });
}

function createHeader(files: File[]) {
    // header由几个整数组成
    // 1. 版本号 - 目前固定为1
    // 2. 图片数量 n
    // 3 - n + 3 每张图片的大小
}

function int2bits(length: number) {
    let lengthStr = length.toString(2);
    const res = [];
    while(lengthStr.length > 0) {
        const currentStr = lengthStr.slice(-7);
        lengthStr = lengthStr.slice(0, -7);
        let endBit = '0';
        if(lengthStr.length) {
            endBit = '1';
        }
        const num = parseInt((currentStr + endBit), 2)
        res.push(num);
    }
    return res;
}

function bits2int(numArr: number[]) {
    let resStr = '';
    for(let item of numArr) {
        const bits = ('00000000' + item.toString(2)).slice(-8);
        const endBit = bits.slice(-1);
        const dataBits = bits.slice(0, -1);
        resStr = dataBits + resStr;
        if(endBit === '0') {
            break;
        }
    }
    return parseInt(resStr, 2);
}