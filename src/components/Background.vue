<template>
  <div class="container" ref="container">
    <canvas ref="canvas" class="canvas" />
  </div>
</template>

<script>
import * as Three from 'three'

export default {
  name: 'App',
  data() {
    return {
      camera: null,
      renderer: null,
      scene: null
    }
  },
  mounted() {
    this.setCamera()
    this.setRenderer()
    this.setMesh()

    const scene = new Three.Scene()
    scene.add(this.mesh)

    const animate = () => {
      requestAnimationFrame(animate)
      this.mesh.rotation.x += 0.01
      this.mesh.rotation.y += 0.01
      this.camera.rotation.z += 0.005
      this.renderer.render(scene, this.camera)
    }
    animate()
  },
  methods: {
    setCamera() {
      let aspect = window.innerWidth / window.innerHeight
      this.camera = new Three.PerspectiveCamera(75, aspect, 0.1, 1000)
      this.camera.position.z = 4
    },
    setRenderer() {
      this.renderer = new Three.WebGLRenderer({
        antialias: true,
        alpha: true,
        canvas: this.$refs.canvas
      })

      this.renderer.setSize(window.innerWidth, window.innerHeight)
    },
    setMesh() {
      const geometry = new Three.TorusGeometry(1, 0.4, 16, 100)
      const material = new Three.PointsMaterial({
        color: '#000000',
        size: 0.025
      })
      this.mesh = new Three.Points(geometry, material)
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
