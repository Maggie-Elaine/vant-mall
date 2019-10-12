export default {
  sku: {
    // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
    // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
    tree: [{
        k: '颜色', // skuKeyName：规格类目名称
        v: [{
            id: '0001', // skuValueId：规格值 id
            name: '极光色', // skuValueName：规格值名称
            imgUrl: '../images/product/p1.webp', // 规格类目图片，只有第一个规格类目可以定义图片
            previewImgUrl: '' // 用于预览显示的规格类目图片
          },
          {
            id: '0002',
            name: '天空之境',
            imgUrl: '../images/product/p4.webp',
            previewImgUrl: ''
          },
          {
            id: '0003',
            name: '亮黑色',
            imgUrl: '../images/product/p5.webp',
            previewImgUrl: ''
          }
        ],
        k_s: 's1' // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
      },
      {
        k: '版本',
        v: [{
            id: '0011',
            name: '8GB+128GB'
          },
          {
            id: '0022',
            name: '8GB+256GB'
          },
          {
            id: '0033',
            name: '8GB+512GB'
          }
        ],
        k_s: 's2'
      }
    ],
    // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
    list: [
      // {
      //   id: 111, // skuId，下单时后端需要
      //   price: 499900, // 价格（单位分）
      //   s1: '0001', // 规格类目 k_s 为 s1 的对应规格值 id
      //   s2: '0011', // 规格类目 k_s 为 s2 的对应规格值 id
      //   s3: '0', // 最多包含3个规格值，为0表示不存在该规格
      //   stock_num: 111 // 当前 sku 组合对应的库存
      // }
      {
        id: 10011,
        price: 499900,
        s1: "0001",
        s2: "0011",
        s3: "0",
        stock_num: 111
      }, {
        id: 10022,
        price: 599900,
        s1: "0001",
        s2: "0022",
        s3: "0",
        stock_num: 111
      }, {
        id: 10033,
        price: 699900,
        s1: "0001",
        s2: "0033",
        s3: "0",
        stock_num: 111
      }, {
        id: 20011,
        price: 499900,
        s1: "0002",
        s2: "0011",
        s3: "0",
        stock_num: 111
      }, {
        id: 20022,
        price: 599900,
        s1: "0002",
        s2: "0022",
        s3: "0",
        stock_num: 111
      }, {
        id: 20033,
        price: 699900,
        s1: "0002",
        s2: "0033",
        s3: "0",
        stock_num: 111
      }, {
        id: 30011,
        price: 499900,
        s1: "0003",
        s2: "0011",
        s3: "0",
        stock_num: 111
      }, {
        id: 30022,
        price: 599900,
        s1: "0003",
        s2: "0022",
        s3: "0",
        stock_num: 111
      }, {
        id: 30033,
        price: 699900,
        s1: "0003",
        s2: "0033",
        s3: "0",
        stock_num: 111
      }
    ],
    price: '4999.00', // 默认价格（单位元）
    stock_num: 227, // 商品总库存
    none_sku: false, // 是否无规格商品
    collection_id: 7777, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
    hide_stock: false // 是否隐藏剩余库存
  },
  goods_id: '10011',
  quota: 3, //限购数量 
  quota_used: 0, //已经购买过的数量
  goods_info: {
    title: '极光色',
    picture:
      '../fake/product/p1.webp' 
  },
  initialSku: {
    s1: '0001',
    s2: '0011',
    selectedNum: 1
  }
}