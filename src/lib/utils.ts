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

export const getImageSize = async (url: string) => {
    const img = new Image();
    return new Promise((resolve) => {
        img.src = url;
        img.onload = e => {
            const { height, width } = img;
            resolve({ height, width });
        }
    })
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
        })
    })
}