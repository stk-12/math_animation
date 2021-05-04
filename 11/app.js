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

    // フォグを作成
    //scene.fog = new THREE.Fog(0x000000, 50, 1000);

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

    for(let i = 0; i < 10; i++){
        const material = new THREE.MeshStandardMaterial({color: 0x15373C});
        const box = new THREE.Mesh(geometry, material);
        box.position.x = random(-width / 5, width / 5);
        box.position.y = random(-height / 5, height / 5);
        box.position.z = random(-width / 5, width / 5);
        
        group.add(box);
    }

    //レンダリング
    renderer.render(scene, camera);


    //初回実行
    tick();
	
    //実行するための関数
    function tick(){
        //アニメーション処理
        for(let i = 0; i < group.children.length; i++){
            const obj = group.children[i];
            rotateX(obj, radian(0.8));
        }
        
        //レンダリング
        renderer.render(scene, camera);
        
        //自分自身を呼び続ける
        requestAnimationFrame(tick);
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
}