<template>
  <swiper
    effect="slide"
    direction="horizontal"
    :spacing="50"
    :speed="1000"
    :mousewheel="true"
    :parallax="true"
    :pagination="pagination"
  >
    <background class="parallax-bg" data-swiper-parallax="-23%" />
    <div class="swiper-pagination" />
    <swiper-slide>
      <div class="swiper-image" data-swiper-parallax-y="-20%">
        <div class="swiper-image-inner swiper-image-left swiper-image-one">
          <h1>
            A <span class="emphasis">Breath</span>. <br /><span
              >Of Fresh Air.</span
            >
          </h1>
          <p>Chapter I, page XV</p>
        </div>
      </div>
      <div class="swiper-image" data-swiper-parallax-y="35%">
        <div class="swiper-image-inner swiper-image-right swiper-image-two">
          <p class="paragraph">
            A Prophet sat in the market-place and told the fortunes of all who
            cared to engage his services. Suddenly there came running up one who
            told him that his house had been broken into by thieves, and that
            they had made off with everything they could lay hands on.
          </p>
        </div>
      </div>
    </swiper-slide>
    <swiper-slide>Slide 2</swiper-slide>
    <swiper-slide>Slide 3</swiper-slide>
    <swiper-slide>Slide 4</swiper-slide>
    <swiper-slide>Slide 5</swiper-slide>
    <swiper-slide>Slide 6</swiper-slide>
    <swiper-slide>Slide 7</swiper-slide>
    <swiper-slide>Slide 8</swiper-slide>
    <swiper-slide>Slide 9</swiper-slide>
    <swiper-slide>Slide 10</swiper-slide>
  </swiper>
</template>

<script>
import Background from './Background.vue'

import { Swiper, SwiperSlide } from 'swiper/vue'
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Mousewheel,
  Parallax
} from 'swiper'

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Mousewheel, Parallax])

export default {
  components: {
    Swiper,
    SwiperSlide,
    Background
  },

  data() {
    return {
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: function(index, className) {
          var temp =
            '<span class="' +
            className +
            '"> <i class="material-icons" style="font-size:60px">cloud</i> </span>'
          console.log(temp)
          return temp
        }
      }
    }
  }
}
</script>

<style lang="scss">
body,
html {
  position: relative;
  height: 100%;
}
body {
  background: #eee;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #000;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.swiper-container {
  width: 100vw;
  height: 100vh;
  margin-left: auto;
  margin-right: auto;
}
.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: transparent;
  color: #000000;

  // Center slide text vertically
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.swiper-pagination {
  top: 5%;
  height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-style: italic;
  font-weight: 300;
  font-size: 18px;
  z-index: 1;

  // &::before {
  //   content: '';
  //   position: absolute;
  //   left: -30px;
  //   top: 0;
  //   height: 100%;
  //   width: 1px;
  //   background-color: rgba(255, 255, 255, 0.2);
  // }

  &-bullet {
    width: auto;
    height: auto;
    flex: 0 1 calc(20% - 8px); /* <-- adjusting for margin */

    text-align: center;
    opacity: 0.5;
    background: rgb(185, 47, 167);
    color: rgba($color: #912323, $alpha: 1);
    margin: 15px 0 !important;
    position: relative;

    // &::before {
    //   content: '';
    //   position: absolute;
    //   top: 8px;
    //   left: -32.5px;
    //   width: 6px;
    //   height: 6px;
    //   border-radius: 100%;
    //   background-color: rgba($color: #912323, $alpha: 1);
    //   transform: scale(0);
    //   transition: 0.2s;
    // }

    &-active {
      opacity: 0.8;
      color: rgba($color: #1d2dbe, $alpha: 1);

      // &::before {
      //   transform: scale(0.5);
      // }
    }
  }
}

.parallax-bg {
  position: absolute;
  left: 0;
  top: 0;
  width: 130%;
  height: 100%;
  -webkit-background-size: cover;
  background-size: cover;
  background-position: center;
}

// .swiper-pagination-bullet {
//   width: 50px !important;
//   height: 20px;
//   text-align: center;
//   line-height: 120px;
//   font-size: 127px;
//   color: #000;
//   opacity: 1;
//   background: rgba(32, 206, 32, 0.2);
// }

// .swiper-pagination-bullet-active {
//   color: #fff;
//   background: #007aff;
// }
.swiper-image {
  width: 50%;
  height: 100%;

  &-one {
    background-image: url(https://clipartix.com/wp-content/uploads/2019/02/butterfly-transparent-clipart-2019-25.png);
  }
  &-two {
    background-image: url(https://clipartix.com/wp-content/uploads/2019/02/butterfly-transparent-clipart-2019-11.png);
  }
  &-three {
    background-image: url(https://source.unsplash.com/sFLVTqNzG2I/1600x900);
  }
  &-four {
    background-image: url(https://source.unsplash.com/pj1jt4vBGZY/1600x900);
  }
  &-five {
    background-image: url(https://source.unsplash.com/Jy6luiLBsrk/1600x900);
  }
  &-six {
    background-image: url(https://source.unsplash.com/bxCgan0J1Sg/1600x900);
  }
}

.swiper-image-inner {
  background-size: cover;
  background-position: center center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: hsla(0, 0%, 0%, 0.2);
  background-blend-mode: overlay;
}
.swiper-image-left {
  padding: 4rem;
  filter: sepia(100%);
  transition: all 1s linear;
  transition-delay: 1s;
}
.swiper-image-right {
  filter: hue-rotate(90deg);
  transition: all 1s linear;
  transition-delay: 1s;
  background-color: hsla(0, 0%, 0%, 0.5);
  background-blend-mode: multiply;
}
h1 {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 500;
  color: #fff;
  align-self: flex-start;
  margin: 0 0 auto 0;
  font-size: 4.5rem;
  line-height: 1;
  transition: all 0.8s cubic-bezier(0.215, 0.61, 0.355, 1) 1.1s;
  transform: translate3d(-20%, 0, 0);
  opacity: 0;
}
h1 span.emphasis {
  font-weight: 700;
  font-style: italic;
  opacity: 0;
  transition: all 0.8s cubic-bezier(0.215, 0.61, 0.355, 1) 1.2s;
  transform: translate3d(-20%, 0, 0);
  display: inline-block;
}
h1 span:not(.emphasis) {
  font-size: 3.5rem;
}
h1 + p {
  font-family: 'Cormorand SC';
  font-size: 14px;
  letter-spacing: 2px;
  margin: 0;
  line-height: 1;
  margin-bottom: auto;
  align-self: flex-end;
  text-transform: uppercase;
  transition: all 0.8s cubic-bezier(0.215, 0.61, 0.355, 1) 1.3s;
  transform: translate3d(-20%, 0, 0);
  opacity: 0;
  font-weight: 500;
  color: #fff;
  padding-right: 8rem;
}
p.paragraph {
  margin: 0;
  font-family: 'Cormorant Garamond', serif;
  color: #fff;
  width: 100%;
  max-width: 350px;
  text-align: justify;
  font-size: 1.2rem;
  font-weight: 500;
  opacity: 0;
  transition: all 0.6s cubic-bezier(0.215, 0.61, 0.355, 1) 1.4s;
  transform: translate3d(-20%, 0, 0);
}

.swiper-slide.swiper-slide-active h1,
.swiper-slide.swiper-slide-active p.paragraph,
.swiper-slide.swiper-slide-active h1 span.emphasis,
.swiper-slide.swiper-slide-active h1 + p {
  transform: translate3d(0, 0, 0);
  opacity: 1;
}

@media screen and (max-width: 1280px) {
  h1 {
    font-size: 3.9rem;
  }
  h1 span:not(.emphasis) {
    font-size: 2.9rem;
  }
  h1 + p {
    font-size: 13px;
  }
  p.paragraph {
    font-size: 1rem;
    line-height: 1.3;
  }
}
@media screen and (max-width: 960px) {
  h1 {
    font-size: 3.5rem;
  }
  h1 span:not(.emphasis) {
    font-size: 2.5rem;
  }
  p.paragraph {
    max-width: 90%;
  }
}
@media screen and (max-width: 640px) {
  #home-slider {
    height: 86vh;
    width: 96vw;
  }
  h1 {
    font-size: 3.2rem;
    align-self: center;
  }
  h1 span:not(.emphasis) {
    font-size: 2.1rem;
  }
  p.paragraph {
    max-width: 94%;
  }
}
</style>
