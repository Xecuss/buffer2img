<script lang="ts">
import { createArrayBufferURL, createCvs, createCvsDataURL, cvsDrawImage, getImageSize, readFile, wait } from './lib/utils';

let srcBuffer: ArrayBuffer;
let srcURL: string = '';
let targetURL: string = '';

const drawArray = async (buffer: ArrayBuffer) => {
  const cvs = createCvs();
  const data = new Uint8Array(buffer);
  const ctx = cvs.getContext('2d');
  const pixCount = Math.floor(data.length / 3) + 1;
  const width = Math.floor(Math.sqrt(pixCount));
  const height = Math.round(Math.floor(pixCount / width) + 1);

  cvs.width = width;
  cvs.height = height;
  ctx.clearRect(0, 0, width, height);
  console.log('start draw');

  for(let i = 0; i < data.length; i += 3) {
    let [r, g, b] = data.slice(i, i + 3);
    const colorStr = `rgb(${r}, ${g || 0}, ${b || 0})`;
    const colorOffset = i / 3;
    ctx.fillStyle = colorStr;
    ctx.fillRect(
      colorOffset % width, 
      Math.floor(colorOffset / width),
      1,
      1
    );
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
    if(data[i + 3] !== 255) {
      console.log('interupt!', i);
      break;
    }
    res.push(...data.slice(i, i + 3));
  }
  const uintRes = Uint8Array.from(res);
  targetURL = createArrayBufferURL(uintRes.buffer);
}

const fileChangeHandle = async (e: Event & { currentTarget: HTMLInputElement; }) => {
  const file = e.currentTarget.files[0];
  srcBuffer = await readFile(file);
  srcURL = createArrayBufferURL(srcBuffer);
}
</script>

<main id="main">
  <div class="left block">
    <input type="file" on:input={fileChangeHandle}>
    {#if srcURL}
    <img src={srcURL} alt="原图" class="src-img">
    {/if}
  </div>
  {#if srcURL}
  <div class="operate">
    <button on:click={() => drawArray(srcBuffer)}>编码</button>
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
