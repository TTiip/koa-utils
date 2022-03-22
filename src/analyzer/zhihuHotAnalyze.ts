import * as superagent from 'superagent'
import * as cheerio from 'cheerio'
import { AnalyzeInterFace, HotListItemInterFace } from '../interface'

class zhihuHotAnalyze implements AnalyzeInterFace {
  private async getHtml() {
		const res = await superagent.get(this.url)
		return res.text
	}

  private getData (html: string) {
    const $ = cheerio.load(html)
    const HotListItem = $('.HotList-item')
    let HotListItemList: HotListItemInterFace[] = []
    HotListItem.map((index, element) => {
      const itemIndex = +$(element).find('.HotList-itemIndex').text()
			const itemTitle = $(element).find('.HotList-itemTitle').text()
			const itemDesc = $(element).find('.HotList-itemExcerpt').text()
			const itemMetrics = $(element).find('.HotList-itemMetrics').text()
			const itemImageSrc = $(element).find('.HotList-itemImgContainer img').attr('src')
			const itemImageAlt = $(element).find('.HotList-itemImgContainer img').attr('alt')
      HotListItemList = [...HotListItemList, {
        index: itemIndex,
        title: itemTitle,
        desc: itemDesc,
        hot: itemMetrics,
        imgSrc: itemImageSrc,
        imgAlt: itemImageAlt
      }]
    })
    return {
			time: +new Date(),
			data: HotListItemList
		}
  }
  public async init () {
    const html = await this.getHtml()
    const analyzeData = this.getData(html)
    return analyzeData
  }
  constructor (private url: string) {}
}

export {
	zhihuHotAnalyze
}
