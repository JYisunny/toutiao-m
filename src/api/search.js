/**
 * 获取联想建议请求模块
 */

import request from '@/utils/request'

export const getSearchSuggestions = (q) => {
  return request({
    method: 'GET',
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}

/**
 * 获取搜索结果请求模块
 */
export const getSearchResult = params => {
  return request({
    method: 'GET',
    url: '/v1_0/search',
    params
  })
}
