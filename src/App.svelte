<script lang="ts">
import { createArrayBufferURL, createCvs, createCvsDataURL, cvsDrawImage, getImageSize, readFile, wait } from './lib/utils';
import { unzlibSync } from 'fflate';
import BitArrayImageData from './lib/ImageData';
import { bits2int, getHeaderNum } from './lib/procFile';

let srcBuffer: ArrayBuffer;
let srcURL: string[] = [];
let targetURL: string[] = [];
let currentTarget: number = 0;
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
      const colorStr = `rgba(${r}, ${g}, ${b}, 255)`;
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
  let url = await createCvsDataURL(cvs);
  targetURL.push(url);
  targetURL = targetURL;
  console.log(targetURL.length);
}

const decode = async () => {
  const cvs = await cvsDrawImage(srcURL[0]);
  const { height, width } = cvs;
  const ctx = cvs.getContext('2d');

  const { data } = ctx.getImageData(0, 0, width, height);
  // const res = [];
  // for(let i = 0; i < data.length; i += 4) {
  //   res.push(...data.slice(i, i + 3));
  // }
  const rawData = Uint8Array.from(data);

  const [offset, length] = bits2int(rawData);
  const zippedData = rawData.slice(offset, length + offset);
  const unzippedData = unzlibSync(zippedData);
  const header = getHeaderNum(unzippedData);

  let current = header.offset;
  for(let i = 0; i < header.fileNum; i++) {
    const img = unzippedData.slice(current, header.fileSizes[i] + current);
    targetURL.push(createArrayBufferURL(img.buffer));
    current += header.fileSizes[i];
  }
  targetURL = targetURL;
}

const compare = async () => {
  console.log('compare start!')
  const cvs = await cvsDrawImage(srcURL[0]);
  const { height, width } = cvs;
  const ctx = cvs.getContext('2d');

  const { data: data1 } = ctx.getImageData(0, 0, width, height);

  const cvs2 = await cvsDrawImage(srcURL[1]);
  const { height: height2, width: width2 } = cvs2;
  const ctx2 = cvs2.getContext('2d');
  const { data: data2 } = ctx2.getImageData(0, 0, width2, height2);

  console.log(`${data1.length} - ${data2.length}`);
  let diffCount = 0;
  for(let i = 0; i < data1.length; i++) {
    if(data1[i] !== data2[i]) {
      console.log(`different in ${i}: ${data1[i]} - ${data2[i]}`);
      diffCount++;
    }
    if(diffCount > 100) {
      console.log('too many diff! skip');
      break;
    }
  }
}

const fileChangeHandle = async (e: Event & { currentTarget: HTMLInputElement; }) => {
  const files = e.currentTarget.files;
  const file = files[0];
  srcBuffer = await readFile(file);
  srcURL.push(createArrayBufferURL(srcBuffer));
  srcURL = srcURL;
  // const file2 = files[1];
  // const srcBuffer2 = await readFile(file2);
  // srcURL.push(createArrayBufferURL(srcBuffer2));
  // srcURL = srcURL;
  await imageData.init(files);
}
</script>

<main id="main">
  <div class="left block">
    <input type="file" on:input={fileChangeHandle} multiple>
    {#if srcURL.length}
    <img src={srcURL[0]} alt="原图" class="src-img">
    {/if}
  </div>
  {#if srcURL}
  <div class="operate">
    <button on:click={() => drawArray(imageData)}>编码</button>
    <button on:click={decode}>解码</button>
    <button on:click={compare}>比较</button>
  </div>
  {/if}
  <div class="right block">
    {#if targetURL.length}
    <img src={targetURL[currentTarget]} alt="结果" class="src-img">
    <a href={targetURL[currentTarget]} download>下载图片</a>
      {#if currentTarget < targetURL.length}
        <!-- svelte-ignore a11y-invalid-attribute -->
        <a href="javascript:void(0);" on:click={() => currentTarget++}>下一张</a>
      {/if}
      {#if currentTarget > 0}
        <!-- svelte-ignore a11y-invalid-attribute -->
        <a href="javascript:void(0);" on:click={() => currentTarget--}>上一张</a>
      {/if}
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
