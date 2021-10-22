import { zlibSync } from "fflate";
import { createHeader } from "./procFile";
import { readFile } from "./utils";

export default class BitArrayImageData {
    public width: number;
    public height: number;
    public realPixel: number;
    public data: Uint8Array;
    public targetFiles: FileList | File[];
    public inited: boolean = false;

    async init(files: FileList | File[]) {
        const header = createHeader(files);
        const fileData: Uint8Array[] = [];
        let fileLength = 0;

        for(let file of files) {
            const buffer = await readFile(file);
            const uintarr = new Uint8Array(buffer);
            console.log(`fileName: ${file.name}: ${file.size} - ${uintarr.length}`);
            fileData.push(uintarr);
            fileLength += uintarr.length;
        }
        let fullData = new Uint8Array(header.length + fileLength);
        fullData.set(header);
        let current = header.length;
        fileData.forEach(buf => {
            fullData.set(buf, current);
            current += buf.length;
        });
        this.data = zlibSync(fullData, { level: 9 });
        this.realPixel = Math.floor(this.data.length / 3) + 1;
        this.width = Math.floor(Math.sqrt(this.realPixel));
        this.height = Math.round(Math.floor(this.realPixel / this.width) + 1);
        this.inited = true;
    }

    getPixel(x: number, y: number) {
        if(x > this.width) {
            throw new Error('out of range');
        }
        const offset = (y * this.width + x - 1) * 3;
        const [r = 0, g = 0, b = 0] = this.data.slice(offset, offset + 3);
        return {r, g, b};
    }
}