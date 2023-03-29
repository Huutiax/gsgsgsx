<template>
  <a-form ref="formRef" :model="contactForm" layout="vertical">
    <a-row :gutter="15">
      <a-col :span="12">
        <a-form-item
          name="firstName"
          label="First name"
          :rules="[{ required: true }]"
        >
          <a-input placeholder v-model:value="contactForm.firstName" />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          name="lastName"
          label="Last name"
          :rules="[{ required: true }]"
        >
          <a-input v-model:value="contactForm.lastName" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="15">
      <a-col :span="12">
        <a-form-item
          name="country"
          label="Country/region"
          :rules="[{ required: true }]"
        >
          <a-select
            v-model:value="contactForm.country"
            :options="[
              { value: 'CN', label: 'China' },
              { value: 'US', label: 'America' },
              { value: 'CA', label: 'Canada' },
            ]"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item name="state" label="State/Province">
          <a-input v-model:value="contactForm.state" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="15">
      <a-col :span="12">
        <a-form-item
          name="city"
          label="City/Town"
          :rules="[{ required: true }]"
        >
          <a-input v-model:value="contactForm.city" />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          name="postcode"
          label="Zip code"
          :rules="[{ required: true }]"
        >
          <a-input v-model:value="contactForm.postcode" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-form-item name="address" label="Address" :rules="[{ required: true }]">
      <a-input v-model:value="contactForm.address" />
    </a-form-item>
    <a-form-item name="other" label="Apartment, suite, etc. (optional)">
      <a-input v-model:value="contactForm.other" />
    </a-form-item>
    <a-row :gutter="15">
      <a-col :span="12">
        <a-form-item
          name="phone"
          label="Phone"
          :rules="[{ required: true, message: 'Phone is required.' }]"
        >
          <a-input v-model:value="contactForm.phone" />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item name="email" label="Email" :rules="[{ required: true }]">
          <a-input v-model:value="contactForm.email" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-form-item name="remark" label="Remark (optional)">
      <a-input v-model:value="contactForm.remark" />
    </a-form-item>
  </a-form>
</template>

<script setup>
import { reactive, ref } from "vue";
const contactForm = reactive({
  country: "US",
  // phone: "17688877891",
  // firstName: "ZongQian",
  // lastName: "Liang",
  // state: "GuangDong",
  // city: "GuangZhou",
  // address: "tian tuo hai hui",
  // other: "4 floor, A area",
  // email: "test@qq.com",
  // remark: "test",
  // postcode: "51000",
});
const formRef = ref();
const validate = () => {
  return formRef.value.validate();
};
const getFieldValues = () => {
  return {
    ...contactForm,
  };
};
// 暴露给父组件调用的方法，ref方式
defineExpose({
  validate,
  getFieldValues,
});
</script>

<style lang="less" scoped>
:deep(.ant-form-item) {
  margin-bottom: 10px;
}
</style>