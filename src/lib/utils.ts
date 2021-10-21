export const wait = (t: number) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, t);
    });
}

export const readFile = async (file: File): Promise<ArrayBuffer> => {
    const reader = new FileReader();
    return new Promise(resolve => {
        reader.readAsArrayBuffer(file);
        reader.onload = (e) => {
            resolve(e.target.result as ArrayBuffer);
        }
    })
}

export const createArrayBufferURL = (buffer: ArrayBuffer) => {
    let blob = new Blob([buffer]);
    return URL.createObjectURL(blob);
}

interface IImageSize {
    width: number;
    height: number;
    img: HTMLImageElement;
}

export const getImageSize = async (url: string): Promise<IImageSize> => {
    const img = new Image();
    return new Promise((resolve) => {
        img.src = url;
        img.onload = e => {
            const { height, width } = img;
            resolve({ height, width, img });
        }
    })
}

export const cvsDrawImage = async (src: string): Promise<HTMLCanvasElement> => {
    const cvs = createCvs();
    const { height, width, img } = await getImageSize(src);
    cvs.height = height;
    cvs.width = width;
    const ctx = cvs.getContext('2d');
    ctx.drawImage(img, 0, 0, width, height);
    return cvs;
}

let cvs = null;
export const createCvs = () => {
    if(!cvs) return cvs = document.createElement('canvas');
    return cvs;
}

export const createCvsDataURL = async (cvs: HTMLCanvasElement): Promise<string> => {
    return new Promise(resolve => {
        cvs.toBlob(blob => {
            resolve(URL.createObjectURL(blob));
        }, 'image/png', 0.1)
    })
}

export function uint8arrExSilce(arr: Uint8Array, left: number, right: number) {
    const length = arr.length * 8;
    let start = left < 0 ? length - left : left;
    let end = right < 0 ? length - right : right;

    start = start < 0 ? 0 : start;
    start = start > length ? length : start;

    end = end < 0 ? 0 : end;
    end = end > length ? length : end;

    if(end <= start) return [];

    const rawStart = Math.floor(start / 8);
    const rawEnd = Math.ceil(end / 8);
    const startOffset = start % 8;
    const endOffset = end % 8;
    const silced = arr.slice(rawStart, rawEnd);
    const sLast = silced.length - 1;

    startOffset && (silced[0] = silced[0] & 0xFF >> startOffset);
    endOffset && (silced[sLast] = silced[sLast] >> (8 - endOffset));

    let res = silced[0];
    for(let i = 0; i < silced.length - 1; i++) {
        res = (res << getHighestBitOffset(silced[i + 1])) + silced[i + 1]
    }
    return res;
}

function getHighestBitOffset(num: number) {
    for(let i = 8; i--; ) {
        if(num & 1 << i) {
            return i + 1;
        }
    }
    return 0;
}