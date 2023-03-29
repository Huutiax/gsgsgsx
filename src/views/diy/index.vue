<template>
  <a-spin :spinning="loading">
    <div class="designer-container">
      <div class="diy-wrapper">
        <!-- 贴图区域 -->
        <DesignViewer :dataSource="svgViewerData" />

        <!-- diy内容选择区域 -->
        <div v-if="!isMobile" class="content-wrapper">
          <div class="collapse-wrapper">
            <a-collapse
              v-model:activeKey="activeTab"
              accordion
              :bordered="false"
              :show-arrow="false"
            >
              <template #expandIcon></template>
              <!-- 选择类型 -->
              <a-collapse-panel key="type">
                <template #extra>
                  <i
                    v-show="!!form.spu.title"
                    class="iconfont icon-check-circle"
                  ></i>
                </template>
                <template #header>
                  <div class="content-title">
                    <i class="iconfont icon-clothes"></i>
                    <span>Select Type</span>
                  </div>
                </template>
                <TypeSelect v-model="form.spu" />
              </a-collapse-panel>

              <!-- 选择NFT IP（图案） -->
              <a-collapse-panel key="ip">
                <template #extra>
                  <i
                    v-if="showNotSelectIpWarningTips"
                    class="iconfont icon-warning"
                  ></i>
                  <i
                    v-show="!!form.ip.id"
                    class="iconfont icon-check-circle"
                  ></i>
                </template>
                <template #header>
                  <div class="content-title">
                    <i class="iconfont icon-photo"></i>
                    <span>Select IP</span>
                  </div>
                </template>
                <IpSelect
                  v-model="form.ip"
                  :data-source="ipList"
                  @update-ip="updateIp"
                />
              </a-collapse-panel>

              <!-- 商品详情、尺寸等 -->
              <a-collapse-panel key="detail">
                <template #extra>
                  <i
                    v-show="Object.keys(state.products).length > 0"
                    class="iconfont icon-check-circle"
                  ></i>
                </template>
                <template #header>
                  <div class="content-title">
                    <i class="iconfont icon-setting"></i>
                    <span>Details</span>
                  </div>
                </template>
                <DetailSelect
                  v-model:printOptions="form.printOptions"
                  v-model:sku="form.sku"
                  :skus="currentSpu.colors"
                  :spu="form.spu"
                  :svg-viewer-data="svgViewerData"
                />
              </a-collapse-panel>
            </a-collapse>

            <!-- 按钮功能区 -->
            <div class="btn-wrapper">
              <p>
                Create your NFT wear.<br />
                Want to unlock more colors or sizes,
                <a href="mailto:hey@ilovenft.com">
                  <Icon style="vertical-align: middle" />
                  <span style="margin-left: 5px">click here</span>
                </a>
                to reach us!
              </p>
              <div>
                <a-button
                  class="block-btn"
                  v-show="activeTab === 'type'"
                  block
                  size="large"
                  type="primary"
                  @click="handleNext('ip')"
                  >Select IP</a-button
                >
                <a-button
                  v-show="activeTab === 'ip'"
                  class="block-btn"
                  block
                  size="large"
                  type="primary"
                  :disabled="!form.ip.id"
                  @click="handleNext('detail')"
                  >Select Detail</a-button
                >
                <a-button
                  v-show="activeTab === 'detail'"
                  class="block-btn"
                  block
                  size="large"
                  type="primary"
                  :disabled="!form.ip.id"
                  @click="handleNext('size')"
                  >Select Size & Quantity</a-button
                >
              </div>
            </div>
          </div>

          <!-- 尺码和数量选择 -->
          <a-drawer
            title="Select Size & Quantity"
            placement="left"
            closable
            :visible="sizeVisible"
            :get-container="false"
            :style="{ position: 'absolute' }"
            width="100%;"
            height="100%"
            @close="sizeVisible = false"
          >
            <template #extra>
              <div class="size-table-tips" @click="sizeTipsVisible = true">
                <i class="iconfont icon-ruler"></i>
                <span>Size Table</span>
              </div>
            </template>
            <SizeSelect v-model="state.products" @close="sizeVisible = false" />

            <template #footer>
              <PriceInfo :amount="totalPrice" :quantity="totalQuantity" />
              <a-button
                class="block-btn"
                block
                size="large"
                type="primary"
                :disabled="totalQuantity < 50"
                @click="handleNext('contact')"
                >Fill In Contact Information</a-button
              >
            </template>
          </a-drawer>

          <!-- 联系信息 -->
          <a-drawer
            title="Contact Information"
            placement="left"
            closable
            :visible="visible"
            :get-container="false"
            :style="{ position: 'absolute' }"
            width="100%;"
            height="100%"
            @close="visible = false"
          >
            <div>
              <ContactForm ref="contactFormRef" />
            </div>

            <template #footer>
              <PriceInfo :amount="totalPrice" :quantity="totalQuantity" />
              <a-button
                class="block-btn"
                block
                size="large"
                type="primary"
                @click="handleConfirm"
                :loading="confirmLoading"
                >Confirm</a-button
              >
              <p
                style="
                  font-size: 12px;
                  color: #777;
                  margin-top: 5px;
                  color: red;
                "
              >
                After we check the order in 2 business days, you will receive a
                confirmation email.
              </p>
            </template>
          </a-drawer>
        </div>
      </div>
    </div>

    <!-- 移动端的 -->
    <template v-if="isMobile">
      <div class="diy-mobile-footer">
        <div class="wrapper">
          <ul class="select-tabs">
            <li class="is-active" @click="openMobileDrawer('type')">
              <i class="iconfont icon-clothes"></i>
              <span>Select Type</span>
            </li>
            <li
              :class="{ 'is-active': !!form.ip.id }"
              @click="openMobileDrawer('ip')"
            >
              <i class="iconfont icon-photo"></i>
              <span>Select IP</span>
            </li>
            <li
              :class="{ 'is-active': Object.keys(state.products).length > 0 }"
              @click="openMobileDrawer('detail')"
            >
              <i class="iconfont icon-setting"></i>
              <span>Details</span>
            </li>
          </ul>
          <!-- <div class="submit-btn">
            <a-button
              class="block-btn"
              block
              size="large"
              type="primary"
              @click="handleConfirm"
              :loading="confirmLoading"
              >Submit</a-button
            >
          </div> -->
        </div>
      </div>

      <a-drawer
        v-model:visible="mobileDrawerVisible.type"
        placement="bottom"
        title="Select Type"
        height="90%"
        class="diy-mobile-drawer"
      >
        <TypeSelect class="is-mobile" v-model="form.spu" />
        <template #footer>
          <a-button
            class="block-btn"
            block
            size="large"
            type="primary"
            @click="openMobileDrawer('ip')"
            >Select IP</a-button
          >
        </template>
      </a-drawer>
      <a-drawer
        v-model:visible="mobileDrawerVisible.ip"
        placement="bottom"
        title="Select IP"
        height="90%"
        class="diy-mobile-drawer"
      >
        <IpSelect
          class="is-mobile"
          v-model="form.ip"
          :data-source="ipList"
          @update-ip="updateIp"
        />
        <template #footer>
          <a-button
            class="block-btn"
            block
            size="large"
            type="primary"
            :disabled="!form.ip.id"
            @click="openMobileDrawer('detail')"
            >Select Detail</a-button
          >
        </template>
      </a-drawer>
      <a-drawer
        v-model:visible="mobileDrawerVisible.detail"
        placement="bottom"
        title="Select Detail"
        height="90%"
        class="diy-mobile-drawer"
      >
        <DetailSelect
          class="is-mobile"
          v-model:printOptions="form.printOptions"
          v-model:sku="form.sku"
          :skus="currentSpu.colors"
          :spu="form.spu"
          :svg-viewer-data="svgViewerData"
        />
        <template #footer>
          <a-button
            class="block-btn"
            block
            size="large"
            type="primary"
            :disabled="!form.ip.id"
            @click="openMobileDrawer('size')"
            >Select Size & Quantity</a-button
          >
        </template>
      </a-drawer>

      <!-- 尺码和数量选择 -->
      <a-drawer
        title="Select Size & Quantity"
        v-model:visible="mobileDrawerVisible.size"
        placement="bottom"
        height="90%"
        class="diy-mobile-drawer"
      >
        <template #extra>
          <div class="size-table-tips" @click="sizeTipsVisible = true">
            <i class="iconfont icon-ruler"></i>
            <span>Size Table</span>
          </div>
        </template>
        <SizeSelect v-model="state.products" @close="sizeVisible = false" />

        <template #footer>
          <PriceInfo
            class="is-mobile"
            :amount="totalPrice"
            :quantity="totalQuantity"
          />
          <a-button
            class="block-btn"
            block
            size="large"
            type="primary"
            :disabled="totalQuantity < 50"
            @click="openMobileDrawer('contact')"
            >Fill In Contact Information</a-button
          >
        </template>
      </a-drawer>

      <!-- 联系信息 移动端 -->
      <a-drawer
        title="Select Size & Quantity"
        v-model:visible="mobileDrawerVisible.contact"
        placement="bottom"
        height="90%"
        class="diy-mobile-drawer"
      >
        <div>
          <ContactForm ref="contactFormRef" />
        </div>

        <template #footer>
          <PriceInfo
            class="is-mobile"
            :amount="totalPrice"
            :quantity="totalQuantity"
          />
          <p
            style="
              font-size: 12px;
              color: #777;
              margin-bottom: 5px;
              padding: 0 15px;
              color: red;
            "
          >
            After we check the order in 2 business days, you will receive a
            confirmation email.
          </p>
          <a-button
            class="block-btn"
            block
            size="large"
            type="primary"
            @click="handleConfirm"
            :loading="confirmLoading"
            >Confirm</a-button
          >
        </template>
      </a-drawer>
    </template>

    <!-- 尺码提示信息 -->
    <a-modal
      v-model:visible="sizeTipsVisible"
      title="Size Table"
      :footer="null"
    >
      <img
        src="/images/size.jpeg"
        alt="size table"
        style="width: 100%; height: auto"
      />
    </a-modal>
  </a-spin>
</template>

<script setup>
import Container from "@/components/Container.vue";
import DesignViewer from "./components/DesignViewer.vue";
import TypeSelect from "./components/TypeSelect.vue";
import DetailSelect from "./components/DetailSelect.vue";
import SizeSelect from "./components/SizeSelect.vue";
import IpSelect from "./components/IpSelect.vue";
import ContactForm from "./components/ContactForm.vue";
import PriceInfo from "./components/PriceInfo.vue";
import { computed, onBeforeMount, reactive, ref, watch } from "vue";
import { useMainStore } from "@/stores/main.js";
import { storeToRefs } from "pinia";
import { getData, getIpList, createOrder, createPaypalOrder } from "@/api";
import { getIPCacheList } from "@/utils";
import Icon from "./components/Icon.vue";

// window.priceData来源后端加载的资源文件
// https://callback.erp.bz-bss.com/price.js
const { typeData: diyData, printData: printAreaData } = window.priceData;

const { isMobile } = storeToRefs(useMainStore());

const activeTab = ref("type");
const visible = ref(false);
const sizeVisible = ref(false);
const sizeTipsVisible = ref(false);
let orderId = "";

const state = reactive({
  printObj: {},
  products: {},
});
const loading = ref(true);
const form = reactive({
  /**
   * 保存所选的spu对象
   */
  spu: {},
  /** 保存所选颜色 */
  sku: {},
  /**
   * 保存所选的ip对象
   */
  ip: {},
  /**
   * 保存打印detail配置对象
   */
  printOptions: {
    frontDesign: "default",
    front: true,
    back: true,
  },
  /**
   * 保存颜色尺码
   */
});

const showNotSelectIpWarningTips = ref(false);
watch([activeTab, () => form.ip.id], (newV) => {
  showNotSelectIpWarningTips.value = !form.ip.id;
});

/**
 * svgViewer显示的数据源
 */
const svgViewerData = computed(() => {
  const { ip, printOptions, sku } = form;
  const { printObj } = state;
  const data = {};

  for (let key in form.sku.skuImage) {
    let printArea = (printObj[key] || {}).printArea || {};

    // 前面设计，如果有多种配置，取设计表单勾选的设计类型
    if (key === "front" && "default" in printArea) {
      const frontDesign = printOptions.frontDesign;
      printArea = printArea[frontDesign];
    }
    data[key] = {
      ...printArea,
      type: key,
      skuImg: sku.skuImage[key],
      ipImg: printOptions[key] ? ip.img2 : "",
      isPrint: printOptions[key],
    };
  }
  console.log("data", data);
  return data;
});

const ipList = ref([]);
const currentSpu = reactive({
  colors: [],
  sizes: [],
});
const spuData = ref();

/**
 * 更新ip列表
 * @param { Object | Undefined } ipObj
 * @param { Array | Undefined } ipListData
 */
const updateIp = (ipObj, ipListData) => {
  // 更新ip列表
  const cacheIPList = getIPCacheList();
  ipList.value = [
    {
      id: -1,
      total: cacheIPList.length,
      title: "Upload PFP & Customized",
      children: cacheIPList,
    },
    ...(ipListData || ipList.value.slice(1)), // 初始化时拼接接口的ipList，非初始化直接修改自定义ip列表
  ];
  // 将当前上传的设置成已选的ip
  if (ipObj) {
    form.ip = ipObj;
  }
  // console.log("缓存数据", getIPCacheList());
};
/**
 * 掉接口，设置默认值
 * 初始化数据
 */
onBeforeMount(async () => {
  loading.value = true;
  const [fullData, ipListData] = await Promise.all([getData(), getIpList()]);
  console.log("spuData: ", spuData);
  spuData.value = fullData;

  // 初始化ip列表
  updateIp(undefined, ipListData);

  const spu = diyData.find((item) => item.active);
  form.spu = spu;
  // 设置默认的sku，用于初始限制喷涂背景图
  form.sku = fullData[spu.title].colors[0];
  currentSpu.colors = fullData[spu.title].colors;
  currentSpu.sizes = fullData[spu.title].sizes;
  loading.value = false;
});

/**
 * 监听切换spu，重置diy配置和获取sku等配置
 */
watch(
  () => form.spu,
  async (newSpu) => {
    state.printObj = printAreaData[newSpu.title];
    try {
      // 取出当前激活spu的数据
      const data = spuData.value[newSpu.title];
      currentSpu.colors = data.colors;
      currentSpu.sizes = data.sizes;
      // 更改当前sku
      form.sku = data.colors[0];

      // 初始默认详情设置
      if (newSpu.title !== "T Shirt") {
        form.printOptions.frontDesign = "default";
      }
      form.printOptions.back = !newSpu.title.match(
        /Shorts|Cap|Bucket Hat|Frisbee/
      );
    } catch (err) {
      console.error(err);
    }
  }
);

/**
 * 更改图案
 */
const changeDiyImage = (imgSrc) => {
  const image = new Image();
  image.onload = () => {
    // 图片宽高比
    const ratio = image.width / image.height;
    const currentItem = state.printObj[activeItem.value.id];
    currentItem.diyStyle.width = currentItem.diyAreaStyle.width;
    currentItem.diyStyle.height = currentItem.diyAreaStyle.width / ratio;
    currentItem.diyStyle.x = 0;
    currentItem.diyImg = imgSrc;
  };
  image.src = imgSrc;
};

/**
 * 处理下一步
 * @param { string } nextType 下一步类型
 */
const handleNext = (nextType) => {
  switch (nextType) {
    case "contact":
      visible.value = true;
      break;
    case "size":
      generateSizeData();
      sizeVisible.value = true;
      break;
    default:
      activeTab.value = nextType;
  }
};

/** ============== 商品列表生成 ============= */
const totalQuantity = computed(() => {
  let _totalQuantity = 0;
  for (let key in state.products) {
    _totalQuantity += state.products[key].sizeData
      .map((item) => item.quantity)
      .reduce((a, b) => a + b);
  }
  return _totalQuantity;
});
const totalPrice = computed(() => {
  let _totalPrice = 0;
  for (let key in state.products) {
    _totalPrice +=
      state.products[key].skuPrintPrice *
      state.products[key].sizeData
        .map((item) => item.quantity)
        .reduce((a, b) => a + b);
  }
  return (Math.ceil(_totalPrice * 100) / 100).toFixed(2);
});
// 移动端是否允许提交
const submitDisabled = computed(() => {
  return Object.keys(state.products).length === 0;
});
/**
 * 生成尺码初始数据
 */
const generateSizeData = () => {
  const { spu, sku, ip } = form;
  if (!sku.color) {
    return;
  }
  // 基础价 + 正面喷图价 + 背面喷图价
  const frontPrintPrice =
    svgViewerData.value.front && svgViewerData.value.front.isPrint
      ? svgViewerData.value.front.price || 0
      : 0;
  const backPrintPrice =
    svgViewerData.value.back && svgViewerData.value.back.isPrint
      ? svgViewerData.value.back.price || 0
      : 0;
  const price = spu.price + frontPrintPrice + backPrintPrice;

  // 只保留一个商品
  state.products = {
    [sku.color]: {
      ip: { ...ip },
      sku: { ...sku },
      spu: { ...spu },
      printData: { ...svgViewerData.value },
      skuPrintPrice: price,
      sizeData: spuData.value[spu.title].sizes.map((size) => ({
        quantity: 0,
        size,
        price,
      })),
    },
  };
  console.log(state.products);
  return;
};

/**
 * 切换ip
 * @param { Object } ipObj ip对象 { id, name, img1, img2 }
 */
const handleChangeIp = (ipObj) => {
  form.ip = ipObj;
};

/**
 * 更改详情配置
 * @param { Object } detailForm {sku, design, printPosition}
 */
const handleChangeDetail = (detailForm) => {
  form.printOptions = detailForm.printOptions;
  form.sku = detailForm.sku;
};

/** ============= 联系信息填写处理 ============= */
const contactFormRef = ref();
const confirmLoading = ref(false);
/**
 * 提交联系表单
 */
const handleConfirm = async () => {
  try {
    confirmLoading.value = true;
    const contactFormValue = await contactFormRef.value.validate();
    // 构造自定义订单数据
    const data = {
      contact: contactFormValue,
      product: Object.values(state.products)[0],
      price: totalPrice.value,
      is_print_back: Number(form.printOptions.back),
      quantity: totalQuantity.value,
    };
    console.log("[自定义订单数据]: ", form, JSON.parse(JSON.stringify(data)));
    const { number: orderId } = await createOrder(data);
    const { pay_url: payLink } = await createPaypalOrder(orderId);
    location.href = payLink;
  } catch (err) {
    confirmLoading.value = false;
    console.error(err);
    if (!isMobile) {
      return;
    }
    // 移动端如果填写地址等信息，弹出选择框
    mobileDrawerVisible.contact = true;
  }
};

const mobileDrawerVisible = reactive({
  type: false,
  ip: false,
  detail: false,
  size: false,
  contact: false,
});
const openMobileDrawer = (type) => {
  for (let key in mobileDrawerVisible) {
    mobileDrawerVisible[key] = key === type;
  }
  if (type === "size") {
    generateSizeData();
  }
};
</script>

<style lang="less" scoped>
@import "@/styles/var.less";

.designer-container {
  box-sizing: border-box;
  width: 1200px;
  margin: 0 auto;

  @media screen and (max-width: 1200px) {
    width: 100%;
    margin: unset;
    padding: 20px;
  }
}

.diy-wrapper {
  display: flex;
  position: relative;
  // height: ~"calc(100vh - @{header-height})";
  width: 100%;
  gap: 50px;
  // padding-right: 400px;

  .image-wrapper {
    flex: 1;
    height: 100%;
    max-width: 600px;
  }
  .content-wrapper {
    // width: 550px;
    flex-basis: 550px;
    flex-shrink: 0;
    position: relative;
    overflow: hidden;
  }

  @media screen and (max-width: 768px) {
    .content-wrapper {
      display: none;
    }
  }
}

.content-wrapper {
  > .collapse-wrapper {
    height: 790px;
    background-color: #fff;
    box-shadow: -4px 0px 10px 0px rgba(0, 0, 0, 0.05);
    position: relative;
    padding-bottom: 160px;
  }

  .btn-wrapper {
    border-top: @border-base;
    height: 160px;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 1;
    box-sizing: border-box;
    padding: 20px 25px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #fff;

    > p {
      font-size: 13px;

      a {
        color: #85c545;
        text-decoration: underline;

        &:hover {
          color: green;
        }
      }
    }
  }
}

.viewer {
  -webkit-user-drag: none;
  display: block;
  height: 100%;
  max-height: 600px;
  max-width: 600px;
  overflow: hidden;
  user-select: none;
  width: 100%;
}

rect:not([fill]) {
  fill: none;
}
// :not(svg) {
//   transform-origin: 0px 0px;
// }

.content-title {
  // font-weight: 500;
  font-size: 18px;
  color: #000;
  display: flex;
  column-gap: 5px;
  display: flex;
  align-items: center;

  .iconfont {
    font-size: 20px;
  }
}

:deep(.ant-drawer) {
  z-index: 98;
}
:deep(.ant-drawer-title) {
  font-size: 18px;
}
:deep(.ant-form) {
  .ant-form-item-label > label {
    font-size: 14px;
    font-weight: 500;
  }
  // input.ant-input {
  //   height: 50px;
  //   line-height: 50px;
  //   font-size: 15px;
  // }
  .ant-input {
    border-color: @border-color-base;
  }
}
:deep(.ant-drawer-footer) {
  padding: 20px 25px;
}

.size-table-tips {
  display: flex;
  gap: 10px;
  align-items: center;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  .iconfont {
    color: #777;
    font-size: 20px;
  }

  > span {
    text-decoration: underline;
    font-weight: 500;
    color: #000;
  }
}

// :deep(.ant-collapse-header) {
//   padding-left: 25px !important;
//   padding-right: 25px !important;
// }
.icon-check-circle {
  color: #85c545;
  font-size: 20px;
}
.icon-warning {
  color: #ff6b00;
  font-size: 20px;
}

.diy-mobile-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: @footer-height-mobile;
  z-index: 9999;
  background-color: #fff;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);

  .wrapper {
    display: flex;
    height: 100%;

    .select-tabs {
      flex: 1;
      display: flex;
      height: 100%;
      > li {
        flex-basis: 33.33%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        height: 100%;
        font-weight: 500;

        &.is-active {
          color: #85c545;
        }

        .iconfont {
          font-size: 24px;
          line-height: 24px;
        }
      }
    }
    .submit-btn {
      width: 30%;
      height: 100%;
      .ant-btn {
        border: none;
        background: #000;
        color: #fff;
        height: 100%;
        font-size: 20px;
        border-radius: 0;
        width: 100%;

        &:disabled {
          opacity: 0.5;
        }
      }
    }
  }
}
</style>

<style lang="less">
@import "@/styles/var.less";
@import "@/styles/mixins.less";

.ant-collapse {
  background-color: #fff;
  &.ant-collapse-borderless > .ant-collapse-item {
    border-bottom-color: @border-color-base;
  }

  .ant-collapse-content > .ant-collapse-content-box {
    padding: 20px 0;
  }

  .ant-collapse-content {
    height: 462px;
    overflow: hidden;

    .ant-collapse-content-box {
      max-height: 462px;
      overflow-y: auto;
      .scrollbar();
    }
  }
}

.page-wrapper {
  .designer-container {
    padding: 0;
    margin-top: 20px;
  }
}
</style>
