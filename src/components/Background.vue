<template>
  <div class="container" ref="container">
    <canvas ref="canvas" class="canvas" />
  </div>
</template>

<script>
import * as Three from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass.js'
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js'
import { FocusShader } from 'three/examples/jsm/shaders/FocusShader.js'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'

import { gsap } from 'gsap'

export default {
  props: {
    meshSource: String
  },
  data() {
    return {
      activeMeshSource: ''
    }
  },
  mounted() {
    this.setAttributes()
    this.setCamera()
    this.setRenderer()
    this.setScene()
    this.setPostProcessing()

    this.meshes = {}
    this.createMesh(this.meshSource)

    window.addEventListener('resize', this.onWindowResize, false)

    this.animate()
  },
  watch: {
    meshSource: function(newMeshSource, oldMeshSource) {
      this.removeMesh(oldMeshSource)
      this.createMesh(newMeshSource)
    }
  },
  computed: {
    activeMesh() {
      return this.meshes[this.activeMeshSource]
    }
  },
  methods: {
    setAttributes() {
      this.camera = null
      this.scene = null
      this.renderer = null
      this.meshes = {}
    },
    animate() {
      requestAnimationFrame(this.animate)
      if (this.activeMesh) {
        this.activeMesh.rotation.y += 0.01
      }
      this.composer.render(0.01)
    },
    createMesh(meshSource) {
      const loader = new OBJLoader()
      loader.load(meshSource, obj => {
        const positions = this.combineBuffer(obj)

        const geometry = new Three.BufferGeometry()
        geometry.setAttribute('position', positions.clone())
        geometry.setAttribute('initialPosition', positions.clone())
        geometry.attributes.position.setUsage(Three.DynamicDrawUsage)
        const material = new Three.PointsMaterial({
          size: 2,
          color: '#666666'
        })

        const mesh = new Three.Points(geometry, material)
        this.meshes[meshSource] = mesh
        this.activeMeshSource = meshSource

        this.scene.add(this.meshes[meshSource])
        this.camera.lookAt(this.scene.position)
      })
    },
    removeMesh(meshSource) {
      const initialArray = this.meshes[meshSource].geometry.attributes.position
        .array
      const finalArray = Float32Array.from(
        { length: initialArray.length },
        () => Math.random() * 1000 - 500
      )
      gsap.to(initialArray, {
        endArray: finalArray,
        duration: 1,
        onUpdate: () =>
          (this.meshes[
            meshSource
          ].geometry.attributes.position.needsUpdate = true),
        onComplete: () => this.scene.remove(this.meshes[meshSource])
      })

      this.activeMeshSource = ''
    },
    setScene() {
      this.scene = new Three.Scene()
      this.scene.background = new Three.Color(0x000000, 0)
    },
    setCamera() {
      let aspect = window.innerWidth / window.innerHeight
      this.camera = new Three.PerspectiveCamera(75, aspect, 0.1, 1000)
      this.camera.position.z = 200
      this.camera.position.y = 250
    },
    setRenderer() {
      this.renderer = new Three.WebGLRenderer({
        antialias: true,
        alpha: true,
        canvas: this.$refs.canvas
      })
      this.renderer.setClearColor(0x000000, 0)
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.setSize(window.innerWidth, window.innerHeight)
    },
    setPostProcessing() {
      const renderModel = new RenderPass(this.scene, this.camera)
      const effectBloom = new BloomPass(0.75)
      const effectFilm = new FilmPass(0.5, 0.5, 1448, false)
      const effectFocus = new ShaderPass(FocusShader)

      this.composer = new EffectComposer(this.renderer)

      this.composer.addPass(renderModel)
      this.composer.addPass(effectBloom)
      this.composer.addPass(effectFilm)
      console.log(effectFilm)
      console.log(effectBloom)
      this.composer.addPass(effectFocus)
    },
    combineBuffer(model) {
      let count = 0
      model.traverse(function(child) {
        if (child.isMesh) {
          count += child.geometry.attributes['position'].array.length
        }
      })
      const combined = new Float32Array(count)
      let offset = 0
      model.traverse(function(child) {
        if (child.isMesh) {
          const buffer = child.geometry.attributes['position']
          combined.set(buffer.array, offset)
          offset += buffer.array.length
        }
      })
      return new Three.BufferAttribute(combined, 3)
    },
    onWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()

      this.camera.lookAt(this.scene.position)

      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.composer.setSize(window.innerWidth, window.innerHeight)
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.canvas {
  width: 100%;
  height: 100%;
}
</style>
