<template>
  <header class="app-header" v-if="!isMobile">
    <div class="wrapper">
      <nav class="nav">
        <ul>
          <li>
            <a href="https://www.ilovenft.com">HOME</a>
          </li>
          <li>
            <a href="https://www.ilovenft.com/about">ABOUT</a>
          </li>
          <li>
            <a href="https://www.ilovenft.com/team">TEAM</a>
          </li>
          <li>
            <a href="https://www.ilovenft.com/shop">STORE</a>
          </li>
        </ul>
      </nav>

      <div class="logo">
        <a href="https://www.ilovenft.com">
          <picture>
            <source type="image/webp" srcset="/images/logo/NFT-black.webp" />
            <img src="/images/logo/NFT-black.png" />
          </picture>
        </a>
      </div>

      <div>
        <a href="https://www.ilovenft.com/cart-page">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            width="46px"
            height="21px"
            viewBox="221.4 359.3 267 123"
            data-hook="svg-icon-8"
          >
            <rect x="221.4" y="403.7" width="152.4" height="6"></rect>
            <path
              d="M345.9 482.3h-96.4c-1.2 0-2.4-1.2-3-2.4l-19.6-70.8 6-1.8 19.1 68.5h92.3l19-68.5 6 1.8 -19.6 70.8C348.2 481.1 347 482.3 345.9 482.3z"
            ></path>
            <rect
              x="259"
              y="380.1"
              transform="matrix(-0.527 -0.8498 0.8498 -0.527 109.9867 827.3946)"
              width="52.4"
              height="6"
            ></rect>
            <rect x="292.3" y="424.5" width="10.7" height="10.7"></rect>
            <rect x="315.5" y="424.5" width="10.7" height="10.7"></rect>
            <rect x="269.1" y="424.5" width="10.7" height="10.7"></rect>
            <rect x="292.3" y="447.7" width="10.7" height="10.7"></rect>
            <rect x="315.5" y="447.7" width="10.7" height="10.7"></rect>
            <rect x="269.1" y="447.7" width="10.7" height="10.7"></rect>
          </svg>
        </a>
        <a href="">
          <svg
            data-bbox="0 0 50 50"
            data-type="shape"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 50 50"
          >
            <g>
              <path
                d="M25 48.077c-5.924 0-11.31-2.252-15.396-5.921 2.254-5.362 7.492-8.267 15.373-8.267 7.889 0 13.139 3.044 15.408 8.418-4.084 3.659-9.471 5.77-15.385 5.77m.278-35.3c4.927 0 8.611 3.812 8.611 8.878 0 5.21-3.875 9.456-8.611 9.456s-8.611-4.246-8.611-9.456c0-5.066 3.684-8.878 8.611-8.878M25 0C11.193 0 0 11.193 0 25c0 .915.056 1.816.152 2.705.032.295.091.581.133.873.085.589.173 1.176.298 1.751.073.338.169.665.256.997.135.515.273 1.027.439 1.529.114.342.243.675.37 1.01.18.476.369.945.577 1.406.149.331.308.657.472.98.225.446.463.883.714 1.313.182.312.365.619.56.922.272.423.56.832.856 1.237.207.284.41.568.629.841.325.408.671.796 1.02 1.182.22.244.432.494.662.728.405.415.833.801 1.265 1.186.173.154.329.325.507.475l.004-.011A24.886 24.886 0 0 0 25 50a24.881 24.881 0 0 0 16.069-5.861.126.126 0 0 1 .003.01c.172-.144.324-.309.49-.458.442-.392.88-.787 1.293-1.209.228-.232.437-.479.655-.72.352-.389.701-.78 1.028-1.191.218-.272.421-.556.627-.838.297-.405.587-.816.859-1.24a26.104 26.104 0 0 0 1.748-3.216c.208-.461.398-.93.579-1.406.127-.336.256-.669.369-1.012.167-.502.305-1.014.44-1.53.087-.332.183-.659.256-.996.126-.576.214-1.164.299-1.754.042-.292.101-.577.133-.872.095-.89.152-1.791.152-2.707C50 11.193 38.807 0 25 0"
              ></path>
            </g>
          </svg>
        </a>
      </div>
    </div>
  </header>
  <header class="app-header-mobile" v-else>
    <a href="https://www.ilovenft.com">iLoveNFT</a>
  </header>
</template>

<script setup>
import { useMainStore } from "@/stores/main.js";
import { storeToRefs } from "pinia";

defineProps({
  msg: {
    type: String,
    required: true,
  },
});
const { isMobile } = storeToRefs(useMainStore());
</script>

<style lang="less" scoped>
@import "@/styles/var.less";
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
  height: @header-height;
  padding: 0 20px;
  background-color: @bg-main;

  .wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.app-header-mobile {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: @header-height-mobile;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  font-size: 20px;
}
.nav {
  color: rgb(117, 117, 117);

  // @media screen and (max-width: 600px) {
  //   display: none;
  // }

  > ul {
    display: flex;

    > li {
      display: inline-block;
      padding: 0 22px;

      // &:first-child {
      //   padding-left: 0;
      // }
      // &:last-child {
      //   padding-right: 0;
      // }
    }
  }
}
.logo {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
