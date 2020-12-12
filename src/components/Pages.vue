<template>
  <swiper
    effect="slide"
    direction="vertical"
    :spacing="100"
    :speed="1000"
    :mousewheel="true"
    :parallax="true"
    :pagination="pagination"
  >
    <background class="parallax-bg" data-swiper-parallax="-30%" />
    <div class="swiper-pagination" />
    <swiper-slide v-for="page in pages" :key="page.name">{{
      page.name
    }}</swiper-slide>
  </swiper>
</template>

<script>
import Background from './Background.vue'

import { Swiper, SwiperSlide } from 'swiper/vue'
import SwiperCore, {
  Navigation,
  Pagination,
  Mousewheel,
  Parallax
} from 'swiper'

SwiperCore.use([Navigation, Pagination, Mousewheel, Parallax])

export default {
  components: {
    Swiper,
    SwiperSlide,
    Background
  },

  data() {
    var pages = [
      {
        name: 'Home',
        icon: 'home'
      },
      {
        name: 'Projects',
        icon: 'build'
      },
      {
        name: 'Musings',
        icon: 'history_edu'
      },
      {
        name: 'Publications',
        icon: 'school'
      },
      {
        name: 'Resume',
        icon: 'business_center'
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
      }
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
  background: rgb(73, 73, 73);
}
.swiper-slide {
  text-align: center;
  display: flex;
  justify-content: center;
  // align-items: center;
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
    background: rgb(32, 32, 32);
    color: rgba($color: #ffffff, $alpha: 1);
    margin: 15px 0 !important;
    position: relative;
    transition: 2s;
    transform: scale(0.5);

    &-active {
      opacity: 0.8;
      // color: rgba($color: #000000, $alpha: 1);
      background: rgba($color: #000000, $alpha: 0);
      transition: 1s;
      transform: scale(1);
      transition: 0.5s;
    }
  }
}

.parallax-bg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 150% !important;
}
</style>
