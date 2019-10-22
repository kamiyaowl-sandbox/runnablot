/**
 * 集合に含まれるか反復計算して確認します
 * @param {number} zx Z0の値
 * @param {number} zy Z0の値
 * @param {number} a 判定したい複素座標の実数部
 * @param {number} b 判定したい複素座標の虚部
 * @param {number} iterLimit 発散判定のイテレーション回数
 * @returns {number} 発散したイテレーション回数、発散しない場合はiterLimit
 */
const checkIter = (zx,zy,a,b,iterLimit) => {
    // 初期座標(Mandelblotなら常に0、ほかはジュリア集合)
    let nx = zx;
    let ny = zy;
    for (let iter = 0 ; iter < iterLimit ; iter++) {
        const x = (nx * nx) - (ny * ny) + a;
        const y = 2 * nx * ny + b;
        // 発散判定
        const abs = Math.abs((x * x) + y * y);
        if (abs >= 2.0) {
            return iter;
        }
        // 座標を更新
        nx = x;
        ny = y;
    }
    // 発散しない
    return iterLimit;
};

/**
 * mandelblot集合の計算結果を2次元配列で返します
 * @param {number} sw 描画座標系の幅
 * @param {number} sh 描画座標系の高さ
 * @param {number} cx 描画する中心座標
 * @param {number} cy 描画する中心座標
 * @param {number} ratio Mandelblot座標系での座標間隔、小さいほど拡大される
 * @param {number} iterLimit 発散判定のイテレーション回数
 * @returns {number[][]} sw*shの配列、内容は発散判定した試行回数
 */
const generate = (sw,sh,cx,cy,ratio,iterLimit) => {
    // mandelbrotの座標系の間隔に変換
    const dx = ratio / sw;
    const dy = ratio / sh;
    // 左上座標
    const baseX = cx - dx * (sw / 2);
    const baseY = cy - dy * (sh / 2);
    // grid列挙
    const dst = [];
    for (let j = 0 ; j < sh ; j++) {
        const y = baseY + j * dy;
        const row = [];
        for (let i = 0 ; i < sw ; i++) {
            const x = baseX + i * dx;
            const iter = checkIter(0,0,x,y,iterLimit);
            row.push(iter);
        }
        dst.push(row);
    }
    return dst;
};

/**
 * 2次元配列の数値から値に勾配のある場所のみ残します
 * @param {number[][]} src 2次元配列 
 */
const detectEdge = (src) => {
    for (let j = 0 ; j < src.length ; j++) {
        for (let i = 0 ; i < src[j].length ; i++) {
            const isLeft   = (i > 0)                 && (src[j][i - 1] != src[j][i]);
            const isRight  = (i < src[j].length - 1) && (src[j][i + 1] != src[j][i]);
            const isTop    = (j > 0)                 && (src[j - 1][i] != src[i][i]);
            const isBottom = (j < src.length - 1)    && (src[j + 1][i] != src[j][i]);
            if (isLeft || isRight || isTop || isBottom) {
                // todo here
            }
        }
    }
}

/**
 * 2次元配列の数値を、0123456789abcdefの文字列で表示します
 * @param {number[][]} src 2次元配列 
 */
const print = (src) => {
    for (let j = 0 ; j < src.length ; j++) {
        let rowStr = "";
        for (let i = 0 ; i < src[j].length ; i++) {
            rowStr += (src[j][i] % 0x10).toString(16);
        }
        console.log(rowStr);
    }
}


// 呼ぶ
const screenWidth = 180;
const screenHeight = 100;
const centerX = 0.0;
const centerY = 0.0;
const ratio = 2.5;
const iterLimit = 100;

const dst = generate(screenWidth,screenHeight,centerX,centerY,ratio,iterLimit);
print(dst);