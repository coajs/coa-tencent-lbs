const address2Location = {
  title: '新研大厦',
  location: { lng: 121.404533, lat: 31.1728 },
  adInfo: { adcode: '310104' },
  addressComponents: {
    province: '上海市',
    city: '上海市',
    district: '徐汇区',
    street: '',
    streetNumber: '',
  },
  similarity: 0.8,
  deviation: 1000,
  reliability: 7,
  level: 10,
}

const location2Address = {
  location: { lat: 39.984154, lng: 116.30749 },
  address: '北京市海淀区北四环西路66号',
  formattedAddresses: { recommend: '海淀区中关村中国技术交易大厦(彩和坊路)', rough: '海淀区中关村中国技术交易大厦(彩和坊路)' },
  addressComponent: {
    nation: '中国',
    province: '北京市',
    city: '北京市',
    district: '海淀区',
    street: '北四环西路',
    streetNumber: '北四环西路66号',
  },
  adInfo: {
    nationCode: '156',
    adcode: '110108',
    cityCode: '156110000',
    name: '中国,北京市,北京市,海淀区',
    location: { lat: 40.045132, lng: 116.375 },
    nation: '中国',
    province: '北京市',
    city: '北京市',
    district: '海淀区',
  },
  addressReference: {
    businessArea: {
      id: '14178584199053362783',
      title: '中关村',
      location: [Object],
      distance: 0,
      dirDesc: '内',
    },
    famousArea: {
      id: '14178584199053362783',
      title: '中关村',
      location: [Object],
      distance: 0,
      dirDesc: '内',
    },
    crossroad: {
      id: '529979',
      title: '海淀大街/彩和坊路(路口)',
      location: [Object],
      distance: 185.8,
      dirDesc: '北',
    },
    town: {
      id: '110108012',
      title: '海淀街道',
      location: [Object],
      distance: 0,
      dirDesc: '内',
    },
    streetNumber: {
      id: '595672509379194165901290',
      title: '北四环西路66号',
      location: [Object],
      distance: 45.8,
      dirDesc: '',
    },
    street: {
      id: '9217092216709107946',
      title: '彩和坊路',
      location: [Object],
      distance: 46.6,
      dirDesc: '西',
    },
    landmarkL2: {
      id: '3629720141162880123',
      title: '中国技术交易大厦',
      location: [Object],
      distance: 0,
      dirDesc: '内',
    },
  },
}

const ipLocation = {
  ip: '202.106.0.30',
  location: {
    lng: 116.407526,
    lat: 39.90403,
  },
  adInfo: {
    nation: '中国',
    province: '',
    city: '',
    adcode: 110000,
  },
}

export declare namespace CoaTencentLbs {
  type Address2Location = typeof address2Location
  type Location2Address = typeof location2Address
  type IpLocation = typeof ipLocation
}
