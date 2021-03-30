/* eslint-disable camelcase */
let _ua = window.navigator.userAgent.toLowerCase()
let _isWeixin = _ua.indexOf('micromessenger') !== -1
export { _isWeixin }
import { authUrl } from '@/setting'
function isArray(obj) {
  let res = Object.prototype.toString.call(obj)
  return res === '[object Array]'
}
function empty(val) {
  if (isArray(val) && val.length === 0) {
    return true
  }
  if (val === undefined || val === null || val === '' || val === 'undefined') {
    return true
  }
  return false
}


// eslint-disable-next-line camelcase
export function getWxCodeUrl(appid, redirect_url, auth_url) {
  let redirect_uri = empty(redirect_url) ? location.href.split('?')[0] : redirect_url
  let auth_redirect_uri = empty(auth_url) ? authUrl : auth_url
  let codeUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize'
  codeUrl += '?appid=' + appid
  codeUrl += '&redirect_uri=' + auth_redirect_uri
  codeUrl += '&response_type=code'
  codeUrl += '&scope=snsapi_base'/* snsapi_base snsapi_userinfo*/
  codeUrl += '&state=' + redirect_uri
  codeUrl += '#wechat_redirect'
  return codeUrl
}
export function getQueryVariable(url, variable) {
  let query = url.search.substring(1)
  let vars = query.split('&')
  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split('=')
    if (pair[0] == variable) { return pair[1] }
  }
  return (false)
}
