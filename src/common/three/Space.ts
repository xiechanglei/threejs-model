import * as THREE from "three"
//鼠标控制
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader"
import {AnimationClip, AnimationMixer} from "three";

const modelLoader = new GLTFLoader()

export class Space {
    scene: THREE.Scene;
    renderer: THREE.WebGLRenderer;
    camera: THREE.PerspectiveCamera;

    constructor(width = 100, height = 100) {
        this.scene = this.initScene(width, height)
        this.camera = this.initCamera(width, height);
        this.renderer = this.initRender();
    }

    initScene(width: number, height: number) {
        const scene = new THREE.Scene()
        const plane = new THREE.Mesh(new THREE.PlaneGeometry(width, height), new THREE.MeshLambertMaterial({color: 0xffffff}))
        plane.rotation.x = -Math.PI / 2
        plane.receiveShadow = true
        // scene.add(plane)

        const spot = new THREE.PointLight(0xffffff)
        // const spot = new THREE.DirectionalLight(0xffffff)
        //光源的位置在盒子的顶角
        spot.position.set(width / 2, Math.max(width, height) / 2, height / 2)
        //光源的强度
        spot.intensity = Math.max(width, height) * Math.max(width, height)
        //光源的距离
        spot.distance = Math.max(width, height) * 10
        spot.castShadow = true
        spot.shadow.camera.near = 0.5
        spot.shadow.camera.far = Math.max(width, height) * 10
        scene.add(spot)

        //坐标轴 蓝色是x 绿色是y 红色是z
        // const axesHelper = new THREE.AxesHelper(100)
        // scene.add(axesHelper)
        return scene
    }

    initCamera(width: number, height: number) {
        const camera = new THREE.PerspectiveCamera(70)
        camera.near = 0.01
        camera.far = 1000
        camera.position.set(0, Math.max(width, height) / 2, height / 2)
        return camera
    }

    initRender() {
        const renderer = new THREE.WebGLRenderer({antialias: true, alpha: false})
        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.toneMapping = THREE.ACESFilmicToneMapping
        renderer.toneMappingExposure = 3
        renderer.shadowMap.enabled = true
        renderer.shadowMap.type = THREE.PCFSoftShadowMap
        renderer.setAnimationLoop(() => renderer.render(this.scene, this.camera))
        //鼠标控制
        new OrbitControls(this.camera, renderer.domElement)
        return renderer
    }

    render(element: HTMLElement) {
        this.camera.aspect = element.clientWidth / element.clientHeight
        this.renderer.setSize(element.clientWidth, element.clientHeight)
        element.appendChild(this.renderer.domElement)
    }


    async addModel(url: string, scale = 1, position: { x: number, y: number, z: number } = {x: 0, y: 0, z: 0}) {
        const {scene, animations} = await modelLoader.loadAsync(url);
        console.log(animations)
        scene.scale.set(scale, scale, scale);``
        scene.position.set(position.x, position.y, position.z);
        scene.castShadow = true;
        scene.receiveShadow = true;
        scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                console.log(child)
                child.castShadow = true;
                child.receiveShadow = true;
                // child.material = new THREE.MeshLambertMaterial({color: 0xff00ff})
            }
        })
        this.scene.add(scene);
        if (animations.length && animations.length > 0) {
            // animations[0].tracks = animations[0].tracks.filter((track) => track.name.endsWith("scale"))
            this.randomModelAnimation(scene, animations[0])
        }
        return scene
    }
    randomModelAnimation(scene: THREE.Group<THREE.Object3DEventMap>, clip: AnimationClip) {
        const allTracks = clip.tracks.filter((track) => !track.name.startsWith("white"))
        // const allTracks = clip.tracks;
        allTracks.forEach((track) => track.times = track.times.map(() => 0))
        const composeTracks = allTracks.map((track) => ({
            track,
            color: track.name.startsWith("red") ? "1" : "2",
            number: parseInt(track.name.match(/\d+/)?.[0] ?? "0")
        }))
        clip.tracks = []
        const lightCount = composeTracks.length / 2
        const animationClock = new THREE.Clock()
        let animationMixer: AnimationMixer | null = null;
        //随机初始化灯的颜色
        const random:string[] = new Array(lightCount).fill("0").map(() => Math.random() > 0.5 ? "1" : "2")
        const animation = () => {
            animationMixer?.stopAllAction()
            animationMixer?.uncacheAction(clip)
            animationMixer = new THREE.AnimationMixer(scene)
            //随机更换3个灯的颜色
            new Array(10).fill("0").forEach(() => {
                const index = Math.floor(Math.random() * lightCount)
                random[index] = random[index] === "1" ? "2" : "1"
            })
            clip.tracks = composeTracks.filter(t => random[(t.number)] === t.color).map(t => t.track)
            // clip.tracks= allTracks
            const animateClipAction = animationMixer.clipAction(clip)
            animateClipAction.setEffectiveTimeScale(1)
            animateClipAction.setEffectiveWeight(1)
            animateClipAction.setLoop(THREE.LoopOnce, Infinity)
            //动画播放完成之后停止在最后一帧
            animateClipAction.clampWhenFinished = true
            //直接到动画的最后一帧
            animateClipAction.play()
            this.renderer.setAnimationLoop(() => {
                animationMixer?.update(animationClock.getDelta())
                this.renderer.render(this.scene, this.camera)
            })
        }
        setInterval(animation, 1000)
        animation()

    }

}