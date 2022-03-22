
import * as fs from 'fs'
import { OutHotListItemInterFace, Content, AnalyzeInterFace } from '../interface'


class Crowller {
  private getData (info: OutHotListItemInterFace) {
    let fileContent: Content = {}
    // 文件存在时去获取文件的内容。
    if (fs.existsSync(this.writePath)) {
      fileContent = JSON.parse(fs.readFileSync(this.writePath, 'utf-8'))
    }
    fileContent[info.time] = info.data
    return fileContent
  }
  private writeData (data: OutHotListItemInterFace) {
    const fileContent = this.getData(data)
		fs.writeFileSync(this.writePath, JSON.stringify(fileContent))
  }
  public async init () {
    const fileContent = await this.analyze.init()
    this.writeData(fileContent)
  }
  constructor (private writePath: string, private analyze: AnalyzeInterFace) {
    this.init()
  }
}

export {
  Crowller
}
