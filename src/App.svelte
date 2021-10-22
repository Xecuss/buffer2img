<script lang="ts">
import { createArrayBufferURL, createCvs, createCvsDataURL, cvsDrawImage, getImageSize, readFile, wait } from './lib/utils';
import { unzlibSync } from 'fflate';
import BitArrayImageData from './lib/ImageData';
import { bits2int, getHeaderNum } from './lib/procFile';

let srcBuffer: ArrayBuffer;
let srcURL: string = '';
let targetURL: string = '';
let imageData = new BitArrayImageData();

const drawArray = async (image: BitArrayImageData) => {
  const cvs = createCvs();
  const ctx = cvs.getContext('2d');
  const { width, height, realPixel } = image;

  cvs.width = width;
  cvs.height = height;
  ctx.clearRect(0, 0, width, height);
  console.log('start draw');

  for(let y = 0; y <= height; y++) {
    for(let x = 0; x <= width; x++) {
      const { r, g, b } = image.getPixel(x, y);
      // y == 0 && (console.log([r, g, b]));
      const colorStr = `rgb(${r}, ${g}, ${b})`;
      ctx.fillStyle = colorStr;
      ctx.fillRect(
        x, 
        y,
        1,
        1
      );
    }
    // if(colorOffset % 5000 === 0) {
    //   await wait(20);
    // }
  }
  console.log('draw finished!')
  targetURL = await createCvsDataURL(cvs);
}

const decode = async () => {
  const cvs = await cvsDrawImage(srcURL);
  const { height, width } = cvs;
  const ctx = cvs.getContext('2d');

  const { data } = ctx.getImageData(0, 0, width, height);
  const res = [];
  for(let i = 0; i < data.length; i += 4) {
    res.push(...data.slice(i, i + 3));
  }
  const rawData = Uint8Array.from(res);

  const [offset, length] = bits2int(rawData);
  const zippedData = rawData.slice(offset, length + offset);
  const unzippedData = unzlibSync(zippedData);
  const header = getHeaderNum(unzippedData);
  const img1 = unzippedData.slice(header.offset, header.fileSizes[0] + header.offset);
  targetURL = createArrayBufferURL(img1.buffer);
}

const fileChangeHandle = async (e: Event & { currentTarget: HTMLInputElement; }) => {
  const files = e.currentTarget.files;
  const file = files[0];
  srcBuffer = await readFile(file);
  srcURL = createArrayBufferURL(srcBuffer);
  await imageData.init(files);
}
</script>

<main id="main">
  <div class="left block">
    <input type="file" on:input={fileChangeHandle} multiple>
    {#if srcURL}
    <img src={srcURL} alt="原图" class="src-img">
    {/if}
  </div>
  {#if srcURL}
  <div class="operate">
    <button on:click={() => drawArray(imageData)}>编码</button>
    <button on:click={decode}>解码</button>
  </div>
  {/if}
  <div class="right block">
    {#if targetURL}
    <img src={targetURL} alt="结果" class="src-img">
    <a href={targetURL} download>下载图片</a>
    {/if}
  </div>
</main>

<style>
#main {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  box-sizing: border-box;
  padding: 20px;
}
.src-img {
  display: block;
  max-width: 100%;
  max-height: 90%;
  margin-top: 20px;
}
.block {
  flex-grow: 1;
  overflow: hidden;
  width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.operate {
  width: 100px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
}
.operate button {
  width: 100%;
  display: block;
}
</style>
