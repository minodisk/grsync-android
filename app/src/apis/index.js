// import (
//   CameraRoll,
// ) from 'react-native'
import fs from 'react-native-fs'
import CameraRoll from 'CameraRoll'

import {
  Dir,
} from '../models'
import {
  syncing,
} from '../actions'

// const HOST_NAME = process.env.NODE_ENV === 'development' ? '192.168.100.18' : '192.168.0.1'
// const HOST_NAME = '192.168.100.18'
// const HOST_NAME = '10.0.1.15'
const HOST_NAME = '192.168.0.1'

// GET /v1/photos/108_0311/GR001288.DNG?size=view HTTP/1.1
// Host: 192.168.0.1
// Connection: keep-alive
// User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36
// Accept: image/webp,image/*,*/*;q=0.8
// Referer: http://www.ricoh-imaging.co.jp/japan/products/gr_remote/app/latest-appcache/index.html
// Accept-Encoding: gzip, deflate, sdch
// Accept-Language: en-US,en;q=0.8,ja;q=0.6

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

export function sync(files, emit) {
  const len = files.length
  const ratioPerJob = 1 / len
  const ratios = files.map(() => 0)
  return Promise.all(files.map((file, i) => {
    const url = file.raw()
    const dir = `${fs.DocumentDirectoryPath}/${file.dirname}`
    const path = `${dir}/${file.name}`
    return fs
      .mkdir(dir)
      .then(() => {
        const {jobId, promise} = fs
          .downloadFile({
            fromUrl: url,
            toFile: path,
            begin: ({headers, contentLength, statusCode, jobId}) => console.log('begin:'),
            progress: ({contentLength, bytesWritten, jobId}) => {
              ratios[i] = ratioPerJob * bytesWritten / contentLength
              emit({progress: ratios.reduce((ratio, r) => ratio + r)})
            },
          })
        return promise
      })
      .then(() => {
        return CameraRoll
          .saveToCameraRoll(path, 'photo')
      })
  }))
}

export const SIZE_THUMBNAIL =  'thumb'
export const SIZE_VIEW = 'view'
export const SIZE_RAW = 'raw'

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
