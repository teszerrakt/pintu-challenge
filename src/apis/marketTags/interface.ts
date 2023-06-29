export type TGetMarketTagsResponse = IGetMarketTagsItem[]

export interface IGetMarketTagsItem {
  id: number
  title: string
  subtitle: string
  language: ILanguage
  url: any
  published_at: string
  created_at: string
  updated_at: string
  statusbar: string
  order: number
  slug: string
  meta_title?: string
  meta_description?: string
  icon: IIcon
  image: IImage
  currencies: ICurrency[]
}

interface ILanguage {
  id: number
  name: string
  created_at: string
  updated_at: string
}

interface IIcon {
  id: number
  name: string
  hash: string
  sha256: any
  ext: string
  mime: string
  size: number
  url: string
  provider: string
  provider_metadata: any
  created_at: string
  updated_at: string
  alternativeText: string
  caption: string
  width: number
  height: number
  formats: any
  previewUrl: any
}

interface IImage {
  id: number
  name: string
  hash: string
  sha256: any
  ext: string
  mime: string
  size: number
  url: string
  provider: string
  provider_metadata: any
  created_at: string
  updated_at: string
  alternativeText: string
  caption: string
  width: number
  height: number
  formats: IFormats
  previewUrl: any
}

interface IFormats {
  small: ISmall
  thumbnail: IThumbnail
}

interface ISmall {
  ext: string
  url: string
  hash: string
  mime: string
  name: string
  path: any
  size: number
  width: number
  height: number
}

interface IThumbnail {
  ext: string
  url: string
  hash: string
  mime: string
  name: string
  path: any
  size: number
  width: number
  height: number
}

interface ICurrency {
  id: number
  name: string
  created_at: string
  updated_at: string
}
