# coa-tencent-lbs

[![GitHub license](https://img.shields.io/badge/license-MIT-green.svg?style=flat-square)](LICENSE)
[![npm version](https://img.shields.io/npm/v/coa-tencent-lbs.svg?style=flat-square)](https://www.npmjs.org/package/coa-tencent-lbs)
[![npm downloads](https://img.shields.io/npm/dm/coa-tencent-lbs.svg?style=flat-square)](http://npm-stat.com/charts.html?package=coa-tencent-lbs)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/coajs/coa-tencent-lbs/pulls)

轻量的腾讯位置服务SDK for Node.js

根据日常实际项目使用进行简单封装

## 快速开始

### 安装

```shell
yarn add coa-tencent-lbs
```

### 使用

```typescript
import { CoaTencentLbsBin, CoaTencentLbsService } from 'coa-tencent-lbs'

// 初始化bin实例（依赖一个redisCache实例）
const bin = new CoaTencentLbsBin('XXXXX-XXXXX-XXXXX-XXXXX-XXXXX-XXXXX', redisCache)

// 根据bin实例创建服务实例
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
```