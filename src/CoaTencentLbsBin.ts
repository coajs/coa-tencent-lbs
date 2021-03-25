import { CoaError } from 'coa-error'
import { $, _, axios, Axios } from 'coa-helper'
import { RedisCache } from 'coa-redis'

const BaseURL = 'https://apis.map.qq.com/ws'

export class CoaTencentLbsBin {

  key: string
  redisCache: RedisCache
  cacheNsp = 'tencent-lbs'

  constructor (key: string, redisCache: RedisCache) {
    this.key = key
    this.redisCache = redisCache
  }

  async request (method: Axios.Method, url: string, data: any, params?: any, config?: Axios.AxiosRequestConfig) {
    const { data: res = {} } = await axios.request({ method, url, data, params, baseURL: BaseURL, ...config })
    res['status'] === 0 || CoaError.throw('CoaTencentLbs.RequestError.' + res['status'], res['message'] || '腾讯位置服务返回错误')
    const result = res.result
    return _.isPlainObject(result) ? $.camelCaseKeys(result) : result
  }

}