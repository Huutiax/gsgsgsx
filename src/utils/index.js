/**
 * 获取自定义ip缓存列表
 */
export const getIPCacheList = () => {
  if (!localStorage.ipCacheList) {
    return [];
  }
  try {
    return JSON.parse(localStorage.ipCacheList);
  } catch (error) {
    return [];
  }
};

/**
 * 往自定义ip缓存列表添加缓存
 * @param { Object } data
 */
export const setIPCacheList = (data) => {
  const cacheData = getIPCacheList();

  localStorage.ipCacheList = JSON.stringify([...cacheData, data]);
};
