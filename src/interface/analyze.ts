interface AnalyzeInterFace {
  [propsName: string]: any
}

interface HotListItemInterFace {
  index: number,
  title: string,
  desc: string,
  hot: string,
  imgSrc: string | undefined,
  imgAlt: string | undefined
}

interface OutHotListItemInterFace {
	time: number,
	data: HotListItemInterFace[]
}

interface Content {
  [propName: string]: any
}

export {
  AnalyzeInterFace,
  HotListItemInterFace,
  OutHotListItemInterFace,
  Content
}