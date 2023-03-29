<template>
  <div class="ip-select-content" v-if="Array.isArray(dataSource)">
    <div v-for="(items, index) in dataSource" :key="index">
      <div class="ip-select-title-wrapper">
        <div class="ip-select-title" @click="toggleCollapse(index)">
          <em></em>
          <span> {{ items.title }}({{ items.total }}) </span>
          <i
            class="iconfont"
            :class="items.collapse ? 'icon-arrow-right' : 'icon-arrow-down'"
          ></i>
        </div>
        <!-- ip自定义上传 -->
        <a-button
          class="upload-btn"
          v-if="items.id === -1"
          @click="visible = true"
          >Upload</a-button
        >
      </div>

      <transition>
        <ul class="ip-select-list" v-show="!items.collapse">
          <li
            v-for="item in items.children"
            :key="item.id"
            class="item"
            :class="{ 'is-selected': modelValue.id === item.id }"
            @click="changeSelectedItem(item)"
          >
            <div class="item-img">
              <img :src="item.img1" :alt="item.name" />
            </div>
            <div class="item-title">
              <div>{{ item.name }}</div>
            </div>
          </li>
        </ul>
      </transition>
    </div>

    <a-modal
      title="Upload IP Map"
      v-model:visible="visible"
      placement="bottom"
      height="90%"
    >
      <div>
        <a-upload
          v-model:file-list="fileList"
          name="avatar"
          list-type="picture-card"
          class="avatar-uploader"
          :show-upload-list="false"
          :before-upload="beforeUpload"
          :customRequest="customRequest"
        >
          <img
            v-if="imageUrl"
            :src="imageUrl"
            alt="avatar"
            style="width: 100%; height: 100%; object-fit: contain"
          />
          <div v-else>
            <loading-outlined v-if="loading.btn"></loading-outlined>
            <plus-outlined v-else></plus-outlined>
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
        <div
          style="text-align: left; color: rgba(0, 0, 0, 0.45); margin: 20px 0"
        >
          <p>
            Select the IP image with a transparent background to ensure a better
            display effect
          </p>
          <p>The recommended size of the IP graph is 800x800px</p>
        </div>
      </div>

      <template #footer>
        <div
          style="
            text-align: left;
            color: rgba(0, 0, 0, 0.45);
            margin-bottom: 30px;
          "
        >
          The IP map you uploaded is your special custom pattern, others cannot
          use it, please feel free to submit
        </div>
        <a-button
          class="block-btn"
          block
          size="large"
          type="primary"
          :loading="loading.confirm"
          @click="hanldeUpload"
          >Agree and Upload</a-button
        >
      </template>
    </a-modal>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { message } from "ant-design-vue";
import { uploadIP } from "@/api";
import { setIPCacheList, getIPCacheList } from "@/utils";
import "ant-design-vue/lib/message/style";

const { modelValue, dataSource } = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
  dataSource: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update:modelValue"]);
const changeSelectedItem = (currentItem) => {
  emit("update:modelValue", currentItem);
};

const toggleCollapse = (listIndex) => {
  dataSource.forEach((item, index) => {
    if (index === listIndex) {
      item.collapse = !item.collapse;
    }
  });
};

const visible = ref(false);
const fileList = ref([]);
const imageUrl = ref("");
const loading = reactive({
  btn: false,
  confirm: false,
});

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const customRequest = ({ file, onSuccess }) => {
  getBase64(file, (base64Url) => {
    imageUrl.value = base64Url;
    loading.btn = false;
  });
  fileList.value = [file];
  onSuccess(file);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.warning("You can only upload JPG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.warning("Image must smaller than 2MB!");
  }
  console.log(message);
  return isJpgOrPng && isLt2M;
};
/**
 * 上传nft ip
 */
const hanldeUpload = async () => {
  loading.confirm = true;
  // 调用上传图片接口
  try {
    const formData = new FormData();
    formData.append("UploadObject[file]", fileList.value[0]);
    const { id, name, img } = await uploadIP(formData);
    const ipObj = {
      id,
      name,
      img1: img,
      img2: img,
    };
    // 前端缓存
    setIPCacheList(ipObj);
    visible.value = false;
    // 通知父组件更新ip列表，并将当前上传ip设置激活状态
    emit("update-ip", ipObj);
    // 清空当前上传文件
    imageUrl.value = "";
    fileList.value = [];
  } catch (err) {
    console.error(err);
    message.error(err);
  }
  loading.confirm = false;
};
</script>

<style lang="less" scoped>
@import "@/styles/var.less";

.ip-select-title-wrapper {
  display: flex;
  justify-content: space-between;
  padding-right: 20px;

  .upload-btn {
    background-color: #000;
    color: #fff;
    border-color: #000;
    outline: none;
    padding: 0 18px;
    height: 30px;
    border-radius: 4px;
    margin-bottom: 10px;
  }
}
.ip-select-title {
  padding-left: 25px;
  color: #000;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  column-gap: 10px;
  align-items: center;
  user-select: none;
  margin-bottom: 10px;

  > em {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #000;
  }
  > span {
    text-decoration: underline;
  }
  > i {
    font-size: 12px;
  }
}
.ip-select-list {
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  gap: 5px 20px;
  font-size: 12px;
  padding: 0 19px 0 25px; // 右侧19px是因为要检测滚动条的宽度
  // justify-content: space-evenly;

  .item {
    cursor: pointer;
    border: 1px solid transparent;
    transition: all 0.15s;
    width: 110px;
    box-sizing: border-box;

    &.upload-item {
      .item-img {
        background-color: #646464;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;

        .icon-plus {
          font-size: 40px;
        }
      }
    }

    .item-img {
      height: 110px;
      width: 110px;
      box-sizing: border-box;
      border: 2px solid transparent;
      border-radius: 4px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .item-title {
      color: #000;
      // display: flex;
      // justify-content: center;
      position: relative;
      height: 30px;

      > div {
        background-color: unset;
        border-radius: 28px;
        transition: all 0.2s;
        height: 28px;
        line-height: 28px;
        transform-origin: 0 0;
        margin-top: 10px;
      }
    }

    &:hover {
      .item-img {
        border-color: #aaa;
      }
    }

    &.is-selected {
      .item-img {
        border-color: #000;
      }
      .item-title {
        color: #fff;
        > div {
          background-color: #000;
        }
      }
    }
  }
}

.ip-select-content {
  &.is-mobile {
    .ip-select-title {
      padding-left: 0;
    }
    .ip-select-list {
      gap: 10px;
      padding: 0;

      .item {
        width: 80px;
        margin-bottom: 10px;

        &.is-selected {
          .item-title {
            color: inherit;
            color: #000;
            > div {
              background-color: unset;
            }
          }
        }

        .item-img {
          width: 80px;
          height: 80px;
        }
        .item-title {
          color: #555;
          height: unset;
          > div {
            height: 20px;
            line-height: 20px;
          }
        }
      }
    }
  }
}
:deep(.ant-upload-picture-card-wrapper) {
  display: flex;
  justify-content: center;

  .ant-upload.ant-upload-select-picture-card {
    width: 200px;
    height: 200px;
  }
}
</style>