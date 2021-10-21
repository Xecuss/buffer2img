export function uint8arrExSilce(arr: Uint8Array, left: number, right: number) {
    const length = arr.length * 8;
    let start = left < 0 ? length + left : left;
    let end = right < 0 ? length + right : right;

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

export function num2bits(num: number): Uint8Array {
    let resArr = [];
    while(num) {
        resArr.push(num & 0xFF);
        num >>= 8;
    }
    return new Uint8Array(resArr);
}

export function bits2num(bits: Uint8Array): number {
    let res = 0;
    for(let i = bits.length; i--; ) {
        res = (res << 8) + bits[i];
    }
    return res;
}

export function toSelfBreakBits(bits: Uint8Array): Uint8Array {
    let silcedOffset = 0;
    let lastSlice = 0;
    return new Uint8Array();
}
