/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  // return /^(https?:|mailto:|tel:)/.test(path)
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,16}$/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validPhone(str) {
  return /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(str)
}
