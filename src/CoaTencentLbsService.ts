import { _ } from 'coa-helper'
import { CoaTencentLbsBin } from './CoaTencentLbsBin'
import { CoaTencentLbs } from './typings'

// 详见接口文档 https://lbs.qq.com/service/webService/webServiceGuide/webServiceOverview
export class CoaTencentLbsService {

  private readonly bin: CoaTencentLbsBin

  constructor (bin: CoaTencentLbsBin) {
    this.bin = bin
  }

  // 逆地址解析（坐标位置描述）提供由经纬度到文字地址及相关位置信息的转换能力
  // 详见 https://lbs.qq.com/service/webService/webServiceGuide/webServiceGcoder
  async location2address (location: string): Promise<CoaTencentLbs.Location2Address> {
    return this.bin.redisCache.warp(this.bin.cacheNsp, `geoCoder-${location}`, () =>
      this.bin.request('GET', '/geocoder/v1/', {}, _.pickBy({ key: this.bin.key, location })), 10)
  }

  // 地址解析（地址转坐标）提供由文字地址到经纬度的转换能力，并同时提供结构化的省市区地址信息
  // 详见 https://lbs.qq.com/service/webService/webServiceGuide/webServiceGeocoder
  async address2location (address: string): Promise<CoaTencentLbs.Address2Location> {
    return this.bin.redisCache.warp(this.bin.cacheNsp, `geoCoder-${address}`, () =>
      this.bin.request('GET', '/geocoder/v1/', {}, _.pickBy({ key: this.bin.key, address })), 10)
  }

  // IP定位，通过终端设备IP地址获取其当前所在地理位置，精确到市级
  // 详见 https://lbs.qq.com/service/webService/webServiceGuide/webServiceIp
  async ipLocation (ip?: string): Promise<CoaTencentLbs.IpLocation> {
    return this.bin.redisCache.warp(this.bin.cacheNsp, `ipLocation-${ip}`, () =>
      this.bin.request('GET', '/location/v1/ip', {}, _.pickBy({ key: this.bin.key, ip })), 10)
  }

  // 行政区划，提供中国标准行政区划数据
  // 详见 https://lbs.qq.com/service/webService/webServiceGuide/webServiceDistrict
  async districtList () {
    return await this.bin.redisCache.warp(this.bin.cacheNsp, 'districtList', async () =>
      this.bin.request('GET', '/district/v1/list', {}, { key: this.bin.key }), 10)
  }

  // 行政区划的树形结构
  async districtTree () {
    return await this.bin.redisCache.warp(this.bin.cacheNsp, 'districtTree', async () => {
      let list = await this.districtList()
      let v0: any[] = []
      _.forEach(list[0], v1 => {
        let info1: any = { value: v1['id'], children: [] }
        // 判断第1层的子
        if (v1['cidx']) {
          let [start1, end1] = v1['cidx']
          for (start1; start1 <= end1; start1++) {
            let v2 = list[1][start1]
            let info2: any = { value: v2['id'], children: [] }
            // 判断第2层的子
            if (v2['cidx']) {
              let [start2, end2] = v2['cidx']
              for (start2; start2 <= end2; start2++) {
                let v3 = list[2][start2]
                let info3: any = {
                  value: v3['id'],
                  label: v3['fullname'],
                }
                info2.children.push(info3)
              }
            }
            info2.children.length || delete info2.children
            info1.children.push(info2)
          }
        }
        info1.children.length || delete info1.children
        v0.push(info1)
      })
      return v0
    })
  }

  async districtTreeType2 () {
    return await this.bin.redisCache.warp(this.bin.cacheNsp, 'districtTreeType2', async () => {
      let list = await this.districtList()
      let v0: any = []
      _.forEach(list[0], v1 => {
        let info1: any = { value: v1['fullname'], label: v1['fullname'], children: [] }
        // 判断第1层的子
        if (v1['cidx']) {
          let [start1, end1] = v1['cidx']
          for (start1; start1 <= end1; start1++) {
            let v2 = list[1][start1]
            let info2: any = { value: v2['fullname'], label: v2['fullname'], children: [] }
            // 判断第2层的子
            if (v2['cidx']) {
              let [start2, end2] = v2['cidx']
              for (start2; start2 <= end2; start2++) {
                let v3 = list[2][start2]
                let info3 = { value: v3['fullname'], label: v3['fullname'] }
                info2.children.push(info3)
              }
            }
            info2.children.length || delete info2.children
            info1.children.push(info2)
          }
        }
        info1.children.length || delete info1.children
        v0.push(info1)
      })
      return v0
    })
  }

  async districtTreeType3 () {
    return await this.bin.redisCache.warp(this.bin.cacheNsp, 'districtTreeType3', async () => {
      let list = await this.districtList()
      let v0: any = []
      _.forEach(list[0], v1 => {
        let info1: any = { name: v1['fullname'], children: [] }

        // 判断第1层的子
        if (v1['cidx']) {
          let [start1, end1] = v1['cidx']
          for (start1; start1 <= end1; start1++) {
            let v2 = list[1][start1]
            let info2: any = { name: v2['fullname'], children: [] }
            // 判断第2层的子
            if (v2['cidx']) {
              let [start2, end2] = v2['cidx']
              for (start2; start2 <= end2; start2++) {
                let v3 = list[2][start2]
                let info3 = { name: v3['fullname'] }
                info2.children.push(info3)
              }
            } else {
              if (!info1.children.length) {
                info1.children.push({ name: info1.name, children: [] })
              }
            }

            if (info2.children.length) {
              info1.children.push(info2)
            } else {
              info2.children.length || info1.children[0].children.push(info2)
              delete info2.children
            }

          }
        }

        info1.children.length || delete info1.children
        v0.push(info1)
      })
      return v0
    })
  }

}