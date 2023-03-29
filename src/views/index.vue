<script setup>
import Container from "../components/Container.vue";
import Image from "../components/Image.vue";
</script>

<template>
  <div class="container">
    <div class="banner">
      <div class="banner-left">
        <Image src="/images/banner.png" :webp="false" responsive />
      </div>
      <div class="banner-right">
        <div>
          <div class="tips">
            <div>Create your</div>
            <div>NFTwear</div>
          </div>
          <div class="button">
            <RouterLink to="/diy">Start</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.container {
  width: 1667px;
  margin: 0 auto;

  @media screen and(min-width: 980px) and(max-width: 1667px) {
    width: 980px;
  }

  @media screen and(max-width: 980px) {
    width: 100%;
    padding: 10px;

    .banner {
      margin: 20px 0;
      .banner-left {
        width: 70%;
      }

      .banner-right {
        .tips {
          font-size: 18px;
          line-height: 28px;
        }
        .button {
          margin-top: 20px;
          font-size: 14px;
        }
      }
    }
  }
}
.banner {
  display: flex;
  margin: 50px 0;

  .banner-right {
    flex: 1;
    background-color: #000;
    color: #fff;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    text-align: center;

    .tips {
      font-size: 26px;
      line-height: 36px;
    }

    .button {
      margin-top: 40px;
      font-size: 16px;
      > a {
        display: inline-block;
        padding: 0 30px;
        line-height: 28px;
        border-radius: 4px;
        background-color: #fff;
        color: #000;
      }
    }
  }
}
</style>
