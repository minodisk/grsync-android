export default class AltDate {
  static parse(s) {
    return new AltDate(new Date(s))
  }

  constructor(raw) {
    this.raw = raw
  }

  timestamp() {
    return this.raw.getTime()
  }

  toDateString() {
    return `${this.padLeft(this.raw.getFullYear(), '0', 4)}-${this.padLeft(this.raw.getMonth() + 1, '0', 2)}-${this.padLeft(this.raw.getDate(), '0', 2)}`
  }

  padLeft(num, char, len) {
    let s = num.toString(10)
    while (s.length < len) {
      s =  char + s
    }
    return s
  }
}
