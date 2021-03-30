import Cookies from 'js-cookie'
import validate from './validate'

const TokenKey = 'token' // token值
const RefreshTokenKey = 'refreshToken' // 刷新token值
const TokenTypeKey = 'tokenType' // token类型
const OpenidKey = 'Openid' // Openid
const uidKey = 'uid' // uid
const UserStatusKey = 'UserStatus'
    // 获取UserStatus
export function getUserStatus() {
    return Cookies.get(UserStatusKey)
}
// 保存UserStatus
export function setUserStatus(UserStatus) {
    return Cookies.set(UserStatusKey, UserStatus)
}
// 删除UserStatus
export function removeUserStatus() {
    return Cookies.remove(UserStatusKey)
}
// 获取Openid
export function getOpenid() {
    return Cookies.get(OpenidKey)
}
// 保存Openid
export function setOpenid(Openid) {
    return Cookies.set(OpenidKey, Openid)
}
// 删除Openid
export function removeOpenid() {
    return Cookies.remove(OpenidKey)
}
// 获取token类型
export function getTokenType() {
    return Cookies.get(TokenTypeKey)
}
// 获取token
export function getTOkens() {
    return validate.getQueryVariable('token')
}
// 保存token值类型
export function setTokenType(tokentype) {
    return Cookies.set(TokenTypeKey, tokentype)
}
// 删除token类型
export function removeTokenType() {
    return Cookies.remove(TokenTypeKey)
}
// 获取token
export function getToken() {
    return Cookies.get(TokenKey)
}
// 保存token值
export function setToken(token) {
    return Cookies.set(TokenKey, token)
}
// 删除token
export function removeToken() {
    return Cookies.remove(TokenKey)
}
// 获取refresh_token
export function getRefreshToken() {
    return Cookies.get(RefreshTokenKey)
}
// 保存refresh_token值
export function setRefreshToken(refreshtoken) {
    return Cookies.set(RefreshTokenKey, refreshtoken)
}
// 删除refresh_token
export function removeRefreshToken() {
    return Cookies.remove(RefreshTokenKey)
}
// 获取用户id
export function getUid() {
    return Cookies.get(uidKey)
}
// 保存用户id
export function setUid(uid) {
    return Cookies.set(uidKey, uid)
}
// 删除用户id
export function removeUid() {
    return Cookies.remove(uidKey)
}