<template>
  <div class="auth-form" :class="{ 'is-mobile': isMobile }">
    <h2 class="title">NFT IP AUTHORIZATION</h2>
    <p class="content">
      <span>Your name</span> is the holder of <span>e.g.BAYC#4207</span> NFT (as
      shown in the picture below). <br />TEAMTOP HARVEST (HONGKONG) LIMITED
      (www.ilovenft.com) is now authorized to promote and sell NFT-related
      products worldwide as the NFT Mr. Li Rui holds. Any risks and
      responsibilities arising in the process of promotion and sales shall be
      borne by TEAMTOP HARVEST (HONGKONG) LIMITED. All related series products
      directly sold by TEAMTOP HARVEST (HONGKONG) LIMITED are guaranteed to be
      qualified genuine products.
    </p>

    <div class="form-wrapper">
      <a-divider>The authorized NFT:</a-divider>
      <div>
        <a-form :model="form">
          <div class="form-upload">
            <a-form-item name="file">
              <a-upload
                v-model:file-list="form.file"
                name="avatar"
                list-type="picture-card"
                class="avatar-uploader"
                :show-upload-list="false"
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              >
                <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
                <div v-else>
                  <loading-outlined v-if="loading"></loading-outlined>
                  <i class="iconfont icon-plus upload-icon" v-else></i>
                  <!-- <div class="ant-upload-text">Upload</div> -->
                </div>
              </a-upload>
            </a-form-item>
          </div>

          <div class="form-main">
            <a-row :gutter="20">
              <a-col :span="12">
                <a-form-item name="signature">
                  <a-input
                    v-model="form.signature"
                    placeholder="Your signature"
                  />
                </a-form-item>
              </a-col>

              <a-col :span="12">
                <a-form-item name="authCode">
                  <a-input
                    v-model="form.signature"
                    placeholder="Authorization code"
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <div>
              <a-form-item name="date">
                <a-date-picker
                  v-model="form.date"
                  placeholder="Select a date"
                />
              </a-form-item>
            </div>
          </div>

          <div class="form-btn">
            <a-form-item>
              <a-button type="primary">Submit</a-button>
            </a-form-item>
          </div>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { useMainStore } from "@/stores/main.js";
import { storeToRefs } from "pinia";

const form = reactive({
  file: [],
  signature: "",
  authCode: "",
  date: "",
});
const { isMobile } = storeToRefs(useMainStore());

const imageUrl = computed(() => {
  try {
    return form.file[0].url;
  } catch (err) {
    return "";
  }
});
</script>

<style lang="less" scoped>
@import "@/styles/var.less";

.upload-icon {
  font-size: 40px;
  color: #999;
}
.auth-form {
  font-family: @font-normal;

  &.is-mobile {
    .title {
      font-size: 16px;
      padding-top: 10px;
      padding-bottom: 20px;
    }
    .content {
      font-size: 14px;
      line-height: 22px;
      margin: 20px 0;
    }
    // .form-wrapper {
    //   padding: 20px 0;
    //   flex-wrap: wrap;

    //   .form-btn {
    //     width: 100%;
    //   }
    // }
  }

  .title {
    padding-top: 20px;
    padding-bottom: 40px;
    border-bottom: @border-base;
    text-align: center;
    font-size: 28px;
  }
  .content {
    font-size: 18px;
    line-height: 32px;
    margin: 40px 0;
    text-indent: 2em;

    span {
      color: #ff0000;
      text-decoration: underline;
    }
  }
}

.form-wrapper {
  background-color: #f8f8fa;
  padding: 40px 0;
  text-align: center;

  :deep(.ant-form) {
    display: flex;
    gap: 20px;
    justify-content: center;
    align-items: center;
    height: 110px;

    .ant-form-item {
      margin-bottom: 0;
    }

    .ant-input,
    .ant-picker {
      height: 40px;
      line-height: 40px;
    }

    .ant-upload.ant-upload-select-picture-card {
      width: 110px;
      height: 110px;
      border: none;
      background-color: @border-color-base;
    }

    .ant-upload {
      margin: 0;
    }

    .ant-picker {
      width: 100%;
    }
  }

  .form-main {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
  }

  .form-btn {
    .ant-btn {
      width: 90px;
      height: 110px;
      border-radius: 4px;
      background: #000;
      color: #fff;
      border-color: #000;
      font-weight: 500;

      &:hover {
        opacity: 0.7;
      }
      &:focus {
        opacity: 0.85;
      }
    }
  }
}
</style>