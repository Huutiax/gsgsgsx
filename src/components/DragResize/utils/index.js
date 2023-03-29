/**
 * @description 绑定事件
 * @param { String } eventName 事件名称
 * @param { Function } eventHandler 事件处理方法
 */
export const bindEvent = (eventName, eventHandler) => {
  document.documentElement.addEventListener(eventName, eventHandler);
};

/**
 * @description 解绑事件
 * @param { String } eventName 事件名称
 * @param { Function } eventHandler 事件处理方法
 */
export const unBindEvent = (eventName, eventHandler) => {
  document.documentElement.removeEventListener(eventName, eventHandler);
};
