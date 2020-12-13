import * as Three from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass.js'
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js'
import { FocusShader } from 'three/examples/jsm/shaders/FocusShader.js'

function getScene() {
  const scene = new Three.Scene()
  scene.background = new Three.Color(0x000000, 0)

  return scene
}

function getCamera() {
  const aspect = window.innerWidth / window.innerHeight
  const camera = new Three.PerspectiveCamera(75, aspect, 0.1, 1000)
  camera.position.z = 200
  camera.position.y = 250
  camera.position.x = 0

  return camera
}

function getControls(camera, canvas) {
  console.log(canvas)
  const controls = new OrbitControls(camera, canvas)
  controls.target.set(0, 5, 0)
  controls.autoRotate = true
  controls.update()

  return controls
}

function getRenderer(canvas) {
  const renderer = new Three.WebGLRenderer({
    antialias: true,
    alpha: true,
    canvas: canvas
  })
  renderer.setClearColor(0x000000, 0)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)

  return renderer
}

function getComposer(scene, camera, renderer) {
  const renderModel = new RenderPass(scene, camera)
  const effectBloom = new BloomPass(1)
  const effectFilm = new FilmPass(0.5, 0.5, 1448, false)
  const effectFocus = new ShaderPass(FocusShader)

  const composer = new EffectComposer(renderer)
  composer.addPass(renderModel)
  composer.addPass(effectBloom)
  composer.addPass(effectFilm)
  composer.addPass(effectFocus)

  return composer
}

export function useThree(canvas) {
  const camera = getCamera()
  const scene = getScene()
  const renderer = getRenderer(canvas)
  const composer = getComposer(scene, camera, renderer)
  const controls = getControls(camera, canvas)

  const light = new Three.PointLight(0xff0000, 1, 100)
  light.position.set(50, 50, 50)
  scene.add(light)
  return {
    camera,
    scene,
    renderer,
    composer,
    controls
  }
}
