<template>
  <div class="swiper-pagination" />
</template>

<script>
export default {
  data() {
    return {
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: function(index, className) {
          return (
            '<span class="' +
            className +
            '"> <i class="material-icons" style="font-size:60px">cloud</i> </span>'
          )
        }
      }
    }
  }
}
</script>

<style lang="scss">
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
    opacity: 0.5;
    background: rgb(185, 47, 167);
    color: rgba($color: #912323, $alpha: 1);
    margin: 15px 0 !important;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 30px;
      left: -32.5px;
      width: 6px;
      height: 6px;
      border-radius: 100%;
      background-color: rgba($color: #912323, $alpha: 1);
      transform: scale(1);
      transition: 5s;
    }

    &-active {
      opacity: 0.8;
      color: rgba($color: #1d2dbe, $alpha: 1);

      &::before {
        transform: scale(5);
        transition: 0.5s;
      }
    }
  }
}
</style>
