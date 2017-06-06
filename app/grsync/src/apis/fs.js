import fs from 'react-native-fs'
import CameraRoll from 'CameraRoll'

export function sync(files, emit) {
  const len = files.length
  const ratioPerJob = 1 / len
  const ratios = files.map(() => 0)
  return Promise.all(files.map((file, i) => {
    const url = file.raw()
    const dir = `${fs.DocumentDirectoryPath}/${file.dirname}`
    const path = `${dir}/${file.name}`

    const start = new Date().getTime()
    let j = 0

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
        console.log('Time:', (new Date().getTime() - start) / 1000, 's')
        return CameraRoll
          .saveToCameraRoll(path, 'photo')
      })
  }))
}
