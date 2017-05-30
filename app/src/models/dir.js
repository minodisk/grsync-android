import File from './file'

export default class Dir {
  name: ''
  files: []

  constructor(raw) {
    this.name = raw.name
    console.log(File.createWithRaw)
    this.files = raw.files.map((file) => File.createWithRaw(this.name, file))
  }
}
