# nft-customization

## 定制流程

1. 选择服装类型
2. 选择 NFT IP
3. 选择位置、是否喷涂背面、左右面等，选择颜色
4. 选择尺码和数量

## 图片文件存储

服装类型 >> SPU >> SKU >> xx.png

```json
{
  "spu": "xx",
  "printArea": {
    "front": {
      "x": 0,
      "y": 0,
      "width": 100,
      "height": 100,
      "diyImg": "",
      "img": ""
    }
  }
}
```

生成的商品数据

```json
[{}]
```
