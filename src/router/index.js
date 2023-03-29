import { createRouter, createWebHistory } from "vue-router";
import IndexPage from "../views/index.vue";
import DiyPage from "../views/diy/index.vue";
import OrderDetail from "../views/order/detail.vue";
// import SuccessOrder from "../views/order/success.vue";
// import FailureOrder from "../views/order/failure.vue";
import OrderResult from "../views/result.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: IndexPage,
    },
    {
      path: "/diy",
      name: "diy",
      component: DiyPage,
    },
    // {
    //   path: "/order/success/:id",
    //   name: "successOrder",
    //   component: SuccessOrder,
    // },
    // {
    //   path: "/order/failure/:id",
    //   name: "failureOrder",
    //   component: FailureOrder,
    // },
    {
      path: "/order/:id",
      name: "diyOrder",
      component: OrderDetail,
    },
    {
      path: "/result/:id",
      name: "orderResult",
      component: OrderResult,
    },
  ],
});

export default router;
