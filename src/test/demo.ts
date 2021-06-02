// @ts-nocheck
import { CoaTencentLbsBin, CoaTencentLbsService } from '..'

const redisCache = {} as any

const bin = new CoaTencentLbsBin('XXXXX-XXXXX-XXXXX-XXXXX-XXXXX-XXXXX', redisCache)

const service = new CoaTencentLbsService(bin)

// 逆地址解析（坐标位置描述）提供由经纬度到文字地址及相关位置信息的转换能力
// 详见 https://lbs.qq.com/service/webService/webServiceGuide/webServiceGcoder
await service.location2address('131.00,22.22')

// 地址解析（地址转坐标）提供由文字地址到经纬度的转换能力，并同时提供结构化的省市区地址信息
// 详见 https://lbs.qq.com/service/webService/webServiceGuide/webServiceGeocoder
await service.address2location('上海市徐汇区桂箐路')

// IP定位，通过终端设备IP地址获取其当前所在地理位置，精确到市级
// 详见 https://lbs.qq.com/service/webService/webServiceGuide/webServiceIp
await service.ipLocation('192.168.1.0')

// 行政区划，提供中国标准行政区划数据
// 详见 https://lbs.qq.com/service/webService/webServiceGuide/webServiceDistrict
await service.districtList()
