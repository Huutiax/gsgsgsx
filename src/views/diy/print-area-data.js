/**
 * 类型数据，price代表基础售价
 */
export const diyData = [
  {
    active: true,
    title: "T Shirt",
    img: "/images/diy/types/type1.png",
    price: 78 + 8,
  },
  {
    title: "SweatShirt",
    price: 90 + 8,
    img: "/images/diy/types/type2.png",
  },
  {
    title: "Hoodie",
    price: 100 + 8,
    img: "/images/diy/types/type3.png",
  },
  {
    title: "Jacket",
    price: 190 + 8,
    img: "/images/diy/types/type4.png",
  },
  {
    title: "Shorts",
    price: 75 + 8,
    img: "/images/diy/types/type5.png",
  },
  {
    title: "Cap",
    price: 15 + 8,
    img: "/images/diy/types/type6.png",
  },
  {
    title: "Bucket Hat",
    price: 20 + 8,
    img: "/images/diy/types/type7.png",
  },
  {
    title: "Frisbee",
    price: 19 + 50,
    img: "/images/diy/types/type8.png",
  },
];

/**
 * diy 打印区域公共数组，按服装类型划分
 */
const printAreaData = {
  "T Shirt": {
    front: {
      id: "front",
      printAreaType: "default",
      printArea: {
        // 左胸，小
        default: {
          price: 0, // 印刷图标额外的价格（基础售价外加的价格）
          x: 460,
          y: 220,
          width: 70,
          height: 70,
        },
        // 左胸，中
        small: {
          price: 50, // 印刷图标额外的价格（基础售价外加的价格）
          x: 440,
          y: 200,
          width: 120,
          height: 120,
        },
        // 正中央大
        big: {
          price: 80, // 印刷图标额外的价格（基础售价外加的价格）
          x: 250,
          y: 200,
          width: 300,
          height: 300,
        },
      },
      img: "",
      active: true,
    },
    // 有背面印刷
    back: {
      id: "back",
      printArea: {
        price: 80, // 印刷图标额外的价格（基础售价外加的价格）
        x: 240,
        y: 180,
        width: 320,
        height: 320,
      },
      img: "",
      active: false,
    },
  },
  SweatShirt: {
    front: {
      id: "front",
      printArea: {
        x: 460,
        y: 240,
        width: 70,
        height: 70,
      },
      img: "/images/diy/sweat-shirt/1.png",
      active: true,
    },
    // 有背面印刷
    back: {
      id: "back",
      printArea: {
        price: 80, // 印刷图标额外的价格（基础售价外加的价格）
        x: 240,
        y: 200,
        width: 320,
        height: 320,
      },
      img: "/images/diy/sweat-shirt/2.png",
      active: false,
    },
  },
  Hoodie: {
    front: {
      id: "front",
      printArea: {
        x: 470,
        y: 280,
        width: 70,
        height: 70,
      },
      img: "/images/diy/hoodie/1.png",
      active: true,
    },
    // 有背面印刷
    back: {
      id: "back",
      printArea: {
        price: 80, // 印刷图标额外的价格（基础售价外加的价格）
        x: 240,
        y: 250,
        width: 320,
        height: 320,
      },

      img: "/images/diy/hoodie/2.png",
      active: false,
    },
  },
  Jacket: {
    front: {
      id: "front",
      printArea: {
        x: 460,
        y: 250,
        width: 70,
        height: 70,
      },

      img: "/images/diy/jacket/1.png",
      active: true,
    },
    // 有背面印刷
    back: {
      id: "back",
      printArea: {
        price: 80, // 印刷图标额外的价格（基础售价外加的价格）
        x: 240,
        y: 150,
        width: 320,
        height: 320,
      },

      img: "/images/diy/jacket/2.png",
      active: false,
    },
  },
  Shorts: {
    front: {
      id: "front",
      printArea: {
        x: 530,
        y: 345,
        width: 70,
        height: 70,
        rotate: -15,
      },
      img: "/images/diy/jacket/1.png",
      active: true,
    },
  },
  Cap: {
    front: {
      id: "front",
      printArea: {
        x: 250,
        y: 240,
        width: 160,
        height: 160,
        rotate: 10,
      },
      img: "/images/diy/cap/1.png",
      active: true,
    },
  },
  "Bucket Hat": {
    front: {
      id: "front",
      printArea: {
        x: 340,
        y: 270,
        width: 120,
        height: 120,
      },
      img: "/images/diy/bucket-hat/1.png",
      active: false,
    },
  },
  Frisbee: {
    front: {
      id: "front",
      printArea: {
        x: 260,
        y: 240,
        width: 280,
        height: 280,
      },
      img: "/images/diy/bucket-hat/1.png",
      active: false,
    },
  },
};

export default printAreaData;
