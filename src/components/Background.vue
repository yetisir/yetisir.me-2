<template>
  <div class="scene-3" ref="container">
    <figure class="scene-3__item">
      <div ref="aspect" class="scene-3__item-aspect" />
    </figure>
    <canvas ref="canvas" class="scene-3__canvas" />
  </div>
</template>

<script>
import * as Three from 'three'

import THREEx from './terrain'

export default {
  name: 'App',
  data() {
    return {
      camera: null,
      renderer: null,
      aspect: {}
    }
  },
  mounted() {
    this.aspect = {
      ref: this.$refs.aspect,
      data: this.$refs.aspect.getBoundingClientRect()
    }

    this.init()
  },
  methods: {
    set_camera() {
      this.camera = new Three.PerspectiveCamera(
        25,
        window.innerWidth / window.innerHeight,
        0.01,
        1000
      )
      this.camera.position.z = 15
      this.camera.position.y = 2
    },
    set_renderer() {
      this.renderer = new Three.WebGLRenderer({
        antialias: true,
        alpha: true,
        canvas: this.$refs.canvas
      })

      this.renderer.setSize(window.innerWidth, window.innerHeight)
    },
    get_mesh() {
      var heightMap = ThreeX.Terrain.allocateHeightMap(256, 256)
      ThreeX.Terrain.simplexHeightMap(heightMap)
      var geometry = ThreeX.Terrain.heightMapToPlaneGeometry(heightMap)
      ThreeX.Terrain.heightMapToVertexColor(heightMap, geometry)
      var material = new Three.MeshBasicMaterial({
        wireframe: true,
        color: 0xff0000
      })
      var mesh = new Three.Mesh(geometry, material)
      mesh.scale.y = 3.5
      mesh.scale.x = 3
      mesh.scale.z = 0.2
      mesh.scale.multiplyScalar(10)
      return mesh
    },
    init() {
      this.set_camera()
      this.set_renderer()

      var scene = new Three.Scene()
      scene.add(this.get_mesh())

      this.renderer.render(scene, this.camera)
    },
    loadTexture(loader, url) {
      return new Promise(resolve => {
        loader.load(url, texture => {
          resolve(texture)
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
.scene-3 {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  &__item {
    position: relative;
    display: flex;
    margin: 0;

    // &-aspect {
    //   padding-top: 60%;
    //   width: 50vw;
    // }

    &-img {
      display: none;
    }
  }

  &__canvas {
    width: 100%;
    height: 100%;
  }
}
</style>
