import {
  Dir,
} from '../models'

// const HOST_NAME = '192.168.100.18'
// const HOST_NAME = '10.0.1.15'
const HOST_NAME = '192.168.0.1'

export const SIZE_THUMBNAIL =  'thumb'
export const SIZE_VIEW = 'view'
export const SIZE_RAW = 'raw'

export function url(path, query) {
  const qs = []
  for (k in query) {
    const v = query[k]
    qs.push(`${k}=${encodeURIComponent(v)}`)
  }
  let q = ''
  if (qs.length > 0) {
    q = `?${qs.join('&')}`
  }
  return `http://${HOST_NAME}${path}${q}`
}

export function imageURL(dirname, filename, size) {
  return url(`/v1/photos/${dirname}/${filename}`, size == null ? null : {size})
}

function get(path, query) {
  const u = url(path)
  console.log('api request:', u)
  console.log('timeout:', 1000)
  return fetch(u, {
    method: 'GET',
    timeout: 1000,
  })
    .then((res) => {
      if (res.statusCode >= 400) {
        throw new Error(res.statusMessage)
      }
      return res.json()
    })
    .then((data) => {
      if (data.errCode >= 400) {
        throw new Error(data.errMsg)
      }
      console.log('api response:', data)
      return data
    })
    .catch((err) => {
      console.log('api error:', err)
      throw err
    })
}

export function ping() {
  return get('/v1/ping')
}

export function dirs() {
  return get('/_gr/objs')
    .then((data) => data.dirs.map((dir) => new Dir(dir)))
}

export function file(dirname, filename, size) {
  return get(`/v1/photos/${dirname}/${filename}`, { size })
}
