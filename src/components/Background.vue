<template>
  <div class="container" ref="container">
    <canvas ref="canvas" class="canvas" />
  </div>
</template>

<script>
import * as Three from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { gsap } from 'gsap'

import { useThree } from '@/composables/useThree'

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
    const three = useThree(this.$refs.canvas)
    this.camera = three.camera
    this.scene = three.scene
    this.renderer = three.renderer
    this.composer = three.composer
    this.controls = three.controls
    this.light = three.light

    this.meshes = {}
    this.meshAnimations = {
      shrink: {},
      explode: {}
    }
    this.addMesh(this.meshSource)

    window.addEventListener('resize', this.onWindowResize)
    // window.addEventListener('mousemove', this.moveCamera)

    this.animate()
  },
  watch: {
    meshSource: function(newMeshSource, oldMeshSource) {
      this.removeMesh(oldMeshSource)
      this.addMesh(newMeshSource)
    }
  },
  computed: {
    activeMesh() {
      return this.meshes[this.activeMeshSource]
    }
  },
  methods: {
    moveCamera(mouseEvent) {
      const x = (mouseEvent.clientX / window.innerWidth) * 2 - 1
      const y = (mouseEvent.clientY / window.innerHeight) * 2 - 1

      console.log(x + ', ' + y)
      this.camera.position.x = -x * 50
      this.camera.position.y = y * 50 + 300
    },
    animate() {
      requestAnimationFrame(this.animate)
      if (this.activeMesh) {
        this.activeMesh.rotation.y += 0.01
      }
      // this.controls.update()
      this.composer.render(0.01)
      // this.renderer.render(this.scene, this.camera)
    },
    async loadMesh(meshSource) {
      const mesh = this.meshes[meshSource]
      if (mesh) {
        this.meshAnimations.explode[meshSource].kill()
        this.meshAnimations.shrink[meshSource].kill()
        mesh.geometry.setAttribute(
          'position',
          mesh.geometry.attributes.initialPosition.clone()
        )
        mesh.material.size = 2
        return mesh
      }

      const loader = new OBJLoader()
      const obj = await loader.loadAsync(meshSource)
      const positions = this.combineBuffer(obj)
      const geometry = new Three.BufferGeometry()
      geometry.setAttribute('position', positions.clone())
      geometry.setAttribute('initialPosition', positions.clone())
      geometry.attributes.position.setUsage(Three.DynamicDrawUsage)
      const material = new Three.PointsMaterial({
        size: 2,
        color: '#666666'
      })
      return new Three.Points(geometry, material)
    },
    addMesh(meshSource) {
      this.loadMesh(meshSource).then(mesh => {
        this.meshes[meshSource] = mesh
        this.activeMeshSource = meshSource
        this.scene.add(mesh)
        this.camera.lookAt(this.scene.position)
      })
    },
    removeMesh(meshSource) {
      const initialArray = this.meshes[meshSource].geometry.attributes.position
        .array
      const finalArray = Float32Array.from(
        { length: initialArray.length },
        () => Math.random() * 100 - 50
      )
      this.activeMeshSource = ''
      this.meshAnimations.explode[meshSource] = gsap.to(initialArray, {
        endArray: finalArray,
        duration: 2,
        onUpdate: () =>
          (this.meshes[
            meshSource
          ].geometry.attributes.position.needsUpdate = true),
        onComplete: () => {
          if (this.activeMeshSource != meshSource) {
            this.scene.remove(this.meshes[meshSource])
          }
        }
      })
      this.meshAnimations.shrink[meshSource] = gsap.to(
        this.meshes[meshSource].material,
        {
          size: 0,
          duration: 1
        }
      )
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
