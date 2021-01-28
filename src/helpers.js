export const serializeObjectParams = (obj, prefix) => {
  const str = []
  let p = null

  for (p in obj) {
    if (obj.hasOwnProperty(p)) {
      const k = prefix ? prefix + '[' + p + ']' : p
      const v = obj[p]

      str.push(
        v !== null && typeof v === 'object'
          ? serializeObjectParams(v, k)
          : encodeURIComponent(k) + '=' + encodeURIComponent(v),
      )
    }
  }

  return str.join('&')
}
