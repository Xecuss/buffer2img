import { readFile } from "./utils";

export default class ImageData {
    public width: number;
    public height: number;
    public realPixel: number;
    public data: Uint8Array;
    public targetFile: File;

    constructor(file: File) {
        this.targetFile = file;
    }

    async init() {
        this.data = new Uint8Array(await readFile(this.targetFile));
        this.realPixel = Math.floor(this.data.length / 3) + 1;
        this.width = Math.floor(Math.sqrt(this.realPixel));
        this.height = Math.round(Math.floor(this.realPixel / this.width) + 1);
    }
}