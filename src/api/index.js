import service, { get, post } from "@/utils/request";

/** NFT IP列表 */
export const getIpList = () => get("/nft/ip-license-list");

/** spu-sku 数据集合 */
export const getData = () => get("/nft/product");

/** 创建订单 */
export const createOrder = (data) => post("/nft/create-order", data);

/** paypal支付 */
export const createPaypalOrder = (number) =>
  post("/nft/create-paypal-order", { number });

/** 获取订单详情 */
export const getOrderDetail = (number) => get("/nft/order-detail", { number });

/** 捕获订单 */
export const captureOrder = (number) => get("/nft/capture-order", { number });

/** 上传自定义ip */
export const uploadIP = (file) =>
  service.post("/nft/upload-ip", file, {
    "Content-type": "multipart/form-data",
  });
