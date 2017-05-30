import {
  imageURL,
  SIZE_THUMBNAIL,
  SIZE_VIEW,
  SIZE_RAW,
} from '../apis'
import Date from './date'

export default class File {
  static createWithRaw(dirname, raw) {
    const name = raw.n
    const date = Date.parse(raw.d)
    const id = `${dirname}-${name}-${date.timestamp()}`
    return new File(id, dirname, name, date)
  }

  static sortDescOnDate(a, b) {
    const t = b.date.timestamp() - a.date.timestamp()
    if (t !== 0) return t
    switch (a.ext()) {
    case '.jpg':
      return -1
    default:
      return 1
    }
  }

  constructor(id, dirname, name, date, selected = false) {
    this.id = id
    this.dirname = dirname
    this.name = name
    this.date = date
    this.selected = selected
  }

  clone() {
    return new File(
      this.id,
      this.dirname,
      this.name,
      this.date,
      this.selected
    )
  }

  ext() {
    let ext = ''
    for (let i = this.name.length - 1; i >= 0; i--) {
      const char = this.name[i]
      ext = char + ext
      if (char === '.') {
        break
      }
    }
    return ext.toLowerCase()
  }

  thumb() {
    return imageURL(this.dirname, this.name, SIZE_THUMBNAIL)
  }

  view() {
    return imageURL(this.dirname, this.name, SIZE_VIEW)
  }

  raw() {
    return imageURL(this.dirname, this.name)
  }
}
