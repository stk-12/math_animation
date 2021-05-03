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
    camera.position.set(400, 200, 700);
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
    const geometry = new THREE.BoxGeometry(100, 100, 100);

    for(let i = 0; i < 12; i++){
        const material = new THREE.MeshStandardMaterial({color: 0x15373C});
        const box = new THREE.Mesh(geometry, material);

        // box.position.y = 200 * Math.sin((i / 4) * Math.PI * 2);
        // box.position.x = 200 * Math.cos((i / 4) * Math.PI * 2);
        //box.position.x = width * i * (width / 6);
        
        //box.position.x = -500 + ((1000 / 8) * i);

        box.position.x = -(width / 2) + ((width / 12) * i);
        
        group.add(box);
    }

    //レンダリング
    renderer.render(scene, camera);

    // アニメーションに使用する角度
    let ang;
    let angle = 0

    //初回実行
    tick();
	
    //実行するための関数
    function tick(){
        //アニメーション処理
        for(let i = 0; i < group.children.length; i++){
            ang = angle + i * (360 / group.children.length);
            group.children[i].position.y = 200 * Math.sin(radian(ang));
            // group.children[i].position.z = 300 * Math.sin(radian(ang));
            // group.children[i].position.x = 300 * Math.cos(radian(ang));
            group.children[i].rotation.y += 0.05;
        }

        angle += 0.8;
        
        //レンダリング
        renderer.render(scene, camera);
        
        //自分自身を呼び続ける
        requestAnimationFrame(tick);
    }

    // ラジアンに変換
    function radian(val) {
        return val * Math.PI / 180;
    }
}