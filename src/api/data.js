const getPath = (type, path) => `http://localhost:50003/${type}/${path}`;

export default {
  "T Shirt": {
    sizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
    colors: [
      {
        name: "白色",
        color: "fff",
        skuImage: {
          front: getPath("T Shirt", "白色_fff/front.png"),
          back: getPath("T Shirt", "白色_fff/back.png"),
        },
      },
      {
        name: "黑色",
        color: "000",
        skuImage: {
          front: getPath("T Shirt", "黑色_000/front.png"),
          back: getPath("T Shirt", "黑色_000/back.png"),
        },
      },
    ],
  },
  SweatShirt: {
    sizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
    colors: [
      {
        name: "白色",
        color: "fff",
        skuImage: {
          front: getPath("SweatShirt", "白色_fff/front.png"),
          back: getPath("SweatShirt", "白色_fff/back.png"),
        },
      },
      {
        name: "黑色",
        color: "000",
        skuImage: {
          front: getPath("SweatShirt", "黑色_000/front.png"),
          back: getPath("SweatShirt", "黑色_000/back.png"),
        },
      },
    ],
  },
  Hoodie: {
    sizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
    colors: [
      {
        name: "白色",
        color: "fff",
        skuImage: {
          front: getPath("Hoodie", "白色_fff/front.png"),
          back: getPath("Hoodie", "白色_fff/back.png"),
        },
      },
      {
        name: "黑色",
        color: "000",
        skuImage: {
          front: getPath("Hoodie", "黑色_000/front.png"),
          back: getPath("Hoodie", "黑色_000/back.png"),
        },
      },
    ],
  },
  Jacket: {
    sizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
    colors: [
      {
        name: "黑色",
        color: "000",
        skuImage: {
          front: getPath("Jacket", "黑色_000/front.png"),
          back: getPath("Jacket", "黑色_000/back.png"),
        },
      },
    ],
  },
  Shorts: {
    sizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
    colors: [
      {
        name: "黑色",
        color: "000",
        skuImage: {
          front: getPath("Shorts", "黑色_000/front.png"),
          back: getPath("Shorts", "黑色_000/back.png"),
        },
      },
    ],
  },
  Cap: {
    sizes: ["Free Size"],
    colors: [
      {
        name: "黑色",
        color: "000",
        skuImage: {
          front: getPath("Cap", "黑色_000/front.png"),
          back: getPath("Cap", "黑色_000/back.png"),
          right: getPath("Cap", "黑色_000/right.png"),
        },
      },
    ],
  },
  "Bucket Hat": {
    sizes: ["Free Size"],
    colors: [
      {
        name: "黑色",
        color: "000",
        skuImage: {
          front: getPath("Bucket Hat", "黑色_000/front.png"),
          back: getPath("Bucket Hat", "黑色_000/back.png"),
        },
      },
    ],
  },
  Frisbee: {
    sizes: ["Free Size"],
    colors: [
      {
        name: "黑色",
        color: "000",
        skuImage: {
          front: getPath("Frisbee", "白色_fff/front.png"),
          back: getPath("Frisbee", "白色_fff/back.png"),
        },
      },
    ],
  },
};
