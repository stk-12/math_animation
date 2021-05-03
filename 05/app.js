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

    // 地面
    const planeGeometry = new THREE.PlaneGeometry(2000, 2000, 1, 1);
    const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xdddddd });
    const plane = new THREE.Mesh(planeGeometry,planeMaterial);
    plane.rotation.x = -0.5 * Math.PI;
    plane.receiveShadow = true;
    //scene.add(plane);

    //BOXを作成
    const geometry = new THREE.BoxGeometry(100, 100, 100);
    const material = new THREE.MeshStandardMaterial({color: 0x15373C});
    const box = new THREE.Mesh(geometry, material);
    box.position.y = 100;
    //box.castShadow = true;
    scene.add(box);

    //レンダリング
    //renderer.render(scene, camera);

    let step = 0;
    let rad;

    //初回実行
    tick();
	
    //実行するための関数
    function tick(){
        //アニメーション処理
        //box.rotation.y += 0.01;
        //box.rotation.x += 0.01;
        step += 1;
        rad = radian(step);
        box.position.y = 300 * Math.sin(rad);
        box.position.x = 150 * Math.cos(rad);
        
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