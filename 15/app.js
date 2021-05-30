window.addEventListener('load', init);

function init(){
    // 描画領域を変数に格納
    const width = window.innerWidth;
    const height = window.innerHeight;

    // レンダラーを作成
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector("#canvas"),
        alpha: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.shadowMap.enable = true;

    // シーンを作成
    const scene = new THREE.Scene();

    //cameraを作成　new THREE.PerspectiveCamera(画角, アスペクト比, 描画開始距離, 描画終了距離)
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 2000);
    camera.position.set(0, 100, 700);
    camera.lookAt(new THREE.Vector3(0, 50, 0));

    //lightを作成
    const light = new THREE.DirectionalLight(0xffffff, 1.5);
    light.position.set(3, 3, 1);
    //light.castShadow = true;
    scene.add(light);

    //グリッドヘルパー
    const grid = new THREE.GridHelper(1000,50);
    scene.add(grid);

    //オブジェクト用グループ
    const group = new THREE.Group();
    scene.add(group);

    //BOXを作成
    const geometry = new THREE.BoxGeometry(50, 50, 50);

    for(let i = 0; i < 20; i++){
        const material = new THREE.MeshStandardMaterial({color: 0x15373C});
        const box = new THREE.Mesh(geometry, material);
        box.position.x = random(-width / 5, width / 5);
        box.position.y = random(-height / 5, height / 5);
        box.position.z = random(-width / 5, width / 5);
        
        group.add(box);
    }

    //レンダリング
    renderer.render(scene, camera);


    //マウス位置
    let mouse = {
        x: 0,
        y: 0
    }

    //速度調整用
    let speedOffset = {
        x: 1,
        y: 1
    }

    //マウス位置を更新
    window.addEventListener('mousemove', mouseMove);


    //初回実行
    tick();
	
    //実行するための関数
    function tick(){

        //X,Y軸回転量をマウス位置によって変更
        const speedOffsetX = map(mouse.y, -2, 2, 0, window.innerHeight);
        const speedOffsetY = map(mouse.x, -2, 2, 0, window.innerWidth);

        const ease = 0.1
        speedOffset.x += (speedOffsetX - speedOffset.x) * ease;
        speedOffset.y += (speedOffsetY - speedOffset.y) * ease;

        //アニメーション処理
        for(let i = 0; i < group.children.length; i++){
            const obj = group.children[i];
            rotateX(obj, radian(0.6 * speedOffset.x));
            rotateY(obj, radian(0.5 * speedOffset.y));
            //rotateX(obj, radian(0.6));
            //rotateY(obj, radian(0.5));
            rotateZ(obj, radian(0.8));
        }
        
        //レンダリング
        renderer.render(scene, camera);
        
        //自分自身を呼び続ける
        requestAnimationFrame(tick);
    }

    // マウス位置を取得
    function mouseMove(e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    }

    // ラジアンに変換
    function radian(val) {
        return val * Math.PI / 180;
    }

    // minからmaxまでのランダム
    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    // X軸の回転
    function rotateX(obj, angle){
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        const y = obj.position.y * cos - obj.position.z * sin;
        const z = obj.position.z * cos + obj.position.y * sin;

        obj.position.y = y;
        obj.position.z = z;
    }

    // Y軸の回転
    function rotateY(obj, angle){
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        const x = obj.position.x * cos - obj.position.z * sin;
        const z = obj.position.z * cos + obj.position.x * sin;

        obj.position.x = x;
        obj.position.z = z;
    }

    // Z軸の回転
    function rotateZ(obj, angle){
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        const x = obj.position.x * cos - obj.position.y * sin;
        const y = obj.position.y * cos + obj.position.x * sin;

        obj.position.x = x;
        obj.position.y = y;
    }

    // 範囲変換
    // val     : 変換したい値
    // toMin   : 変換後の最小値
    // toMax   : 変換後の最大値
    // fromMin : 変換前の最小値
    // fromMax : 変換前の最大値
    function map(val, toMin, toMax, fromMin, fromMax) {
        if(val <= fromMin) {
            return toMin;
        }
        if(val >= fromMax) {
            return toMax;
        }
        let p = (toMax - toMin) / (fromMax - fromMin);
        return ((val - fromMin) * p) + toMin;
    }
}