<template>
  <swiper
    effect="slide"
    direction="vertical"
    :spacing="100"
    :speed="1000"
    :mousewheel="true"
    :parallax="true"
    :pagination="pagination"
    @slideChange="onPageChange"
  >
    <background
      :meshSource="meshSource"
      :activePageIndex="activePageIndex"
      :numberOfPages="pages.length"
      class="background"
    />
    <div class="swiper-pagination" />
    <swiper-slide v-for="page in pages" :key="page.name">
      <div class="p-grid">
        <h1>Title</h1>
      </div>
      <div class="p-grid">
        <card class="p-col" :title="page.name" content="test2" />
      </div>
      <div class="p-grid">
        <card class="p-col" :title="page.icon" content="test2" />
      </div>
    </swiper-slide>
  </swiper>
</template>

<script>
import Background from './Background.vue'
import Card from './Card.vue'

import { Swiper, SwiperSlide } from 'swiper/vue'
import SwiperCore, { Navigation, Pagination, Mousewheel } from 'swiper'

SwiperCore.use([Navigation, Pagination, Mousewheel])

export default {
  components: {
    Swiper,
    SwiperSlide,
    Background,
    Card
  },

  data() {
    var pages = [
      {
        name: 'Home',
        icon: 'home',
        mesh: './man.obj'
      },
      {
        name: 'Projects',
        icon: 'build',
        mesh: './woman.obj'
      },
      {
        name: 'Musings',
        icon: 'history_edu',
        mesh: './tree.obj'
      },
      {
        name: 'Publications',
        icon: 'school',
        mesh: './emerald.obj'
      },
      {
        name: 'Resume',
        icon: 'business_center',
        mesh: './ninja.obj'
      }
    ]
    return {
      pages,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: function(index, className) {
          return (
            '<span class="' +
            className +
            '"> <i class="material-icons" style="font-size:60px">' +
            pages[index].icon +
            '</i> </span>'
          )
        }
      },
      activePageIndex: 0
    }
  },
  methods: {
    onPageChange(swiper) {
      this.activePageIndex = swiper.activeIndex
    }
  },
  computed: {
    meshSource: function() {
      return this.pages[this.activePageIndex].mesh
    },
    pageName: function() {
      return this.pages[this.activePageIndex].name
    }
  }
}
</script>

<style lang="scss">
body {
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.swiper-container {
  width: 100vw;
  height: 100vh;
  background: rgb(153, 79, 79);
}
.swiper-slide {
  width: 100vw;
  height: 100vh;
  text-align: center;
  justify-content: center;
  color: #ffffff;
}

.swiper-pagination {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-style: italic;
  font-weight: 300;
  font-size: 18px;
  z-index: 1;

  &-bullet {
    width: auto;
    height: auto;

    text-align: center;
    text-justify: center;
    opacity: 0.4;
    background: rgb(131, 131, 131);
    color: rgba($color: #ffffff, $alpha: 1);
    margin: 15px 0 !important;
    position: relative;
    transition: 2s;
    transform: scale(0.5);

    &-active {
      opacity: 0.8;
      background: rgba($color: #000000, $alpha: 0);
      transition: 1s;
      transform: scale(1);
      transition: 0.5s;
    }
  }
}

.background {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
}
</style>
