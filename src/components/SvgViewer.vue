<template>
  <svg viewBox="0 0 800 800" width="800" height="800" class="viewer">
    <image :xlink:href="dataSource.skuImg" :width="800" :height="800" />

    <g
      v-if="dataSource.ipImg"
      :transform="`translate(${dataSource.x || 0}, ${dataSource.y || 0})${
        dataSource.rotate ? `rotate(${dataSource.rotate})` : ''
      }`"
      :width="dataSource.width"
      :height="dataSource.height"
    >
      <foreignObject
        :width="dataSource.width"
        :height="dataSource.height"
        class="design-area"
      >
        <div style="width: 100%; height: 100%">
          <img :src="dataSource.ipImg" class="design-img" />
        </div>
      </foreignObject>
    </g>
  </svg>
</template>

<script setup>
const { dataSource } = defineProps({
  dataSource: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<style lang="less" scoped>
.design-area {
  // border: 1px dashed transparent;

  // &.active {
  //   border-color: #ccc;
  // }
}

.vdr {
  border: none;
  // &.active {
  //   // border: 1px dashed #ccc;
  //   border: none;
  // }
}

.design-img {
  display: inline-block;
  vertical-align: middle;
  // width: 100%;
  // height: auto;
  width: 100%;
  height: auto;
}
</style>