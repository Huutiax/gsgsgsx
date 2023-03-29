<template>
  <div class="design-viewer">
    <!-- 主图显示 -->
    <div class="svg-viewer">
      <SvgViewer v-if="!!activeItem" :data-source="activeItem" />
    </div>

    <!-- 正面、反面、左臂、右臂图片选择 -->
    <ul class="thumbnail-list">
      <li
        v-for="(item, key) in props.dataSource"
        :key="key"
        :class="{ 'is-active': activeKey === key }"
        :data-key="key"
        class="item"
        @mouseenter="changeActiveItem(key)"
        :style="{ order: keyOrderMap[key] }"
      >
        <div class="svg-content">
          <SvgViewer :data-source="item" />
        </div>
        <div class="name">{{ key }}</div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed, onUpdated, ref, watch } from "vue";
import SvgViewer from "@/components/SvgViewer.vue";

/**
 * 设计试图及时显示组件
 */
const props = defineProps({
  dataSource: {
    type: Object,
    default: () => ({}),
  },
});

// flex排序map
const keyOrderMap = {
  front: 0,
  back: 1,
  left: 2,
  right: 3,
};

const activeKey = ref("front");
watch(
  () => props.dataSource,
  (newV) => {
    if (newV[activeKey.value]) {
      return;
    }
    activeKey.value = "front";
  }
);

const activeItem = computed(() => {
  return props.dataSource[activeKey.value];
});

const changeActiveItem = (currentKey) => {
  if (activeKey.value === currentKey) {
    return;
  }
  activeKey.value = currentKey;
};
</script>

<style lang="less" scoped>
.design-viewer {
  flex: 1;
  height: 100%;
  max-width: 600px;
}
.svg-viewer {
  height: ~"calc(100% - 98px)";

  > svg {
    width: 100%;
    height: auto;
  }
}
.thumbnail-list {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  gap: 10px;

  .item {
    width: 60px;
    height: 80px;
    cursor: pointer;
    font-size: 12px;
    text-align: center;

    &.is-active {
      > .svg-content {
        border-color: blue;
      }
    }

    > .svg-content {
      width: 60px;
      height: 60px;
      border: 1px solid #ccc;
      padding: 10px;
      box-sizing: border-box;
      background-color: #fff;

      :deep(.viewer) {
        width: 100%;
        height: 100%;
      }
    }

    > .name {
      line-height: 20px;
      text-transform: capitalize;
    }
  }
}
</style>