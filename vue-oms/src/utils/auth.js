import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

// https://www.cnblogs.com/xuyan1/p/8421284.html
export function getToken() {
  console.log(TokenKey + '获取token' + Cookies.get(TokenKey))
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
