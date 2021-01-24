import { FC } from 'react'
import { TypeItem, Sku } from '../../types/TypeItem'
import Image from 'next/image'
import Slider from './Slider'
import AddCart from './AddCart'
import s from '../../styles/components/items/Detail.module.scss'

type Props = {
  detail: TypeItem
}

const Detail: FC<Props> = ({ detail }) => {
  return (
    <>
      <div className={s.itemSectionTitleContainer}>
        <h2>{detail.title}</h2>
      </div>
      <div className={s.items}>
        <div className={s.item}>
          <div className={s.item__left}>
            <Slider>
              {detail.images.map((image, i) => (
                <div key={image.src}>
                  <Image
                    src={image.src}
                    alt={detail.title || 'Item Image'}
                    width={500}
                    height={500}
                    priority={i === 0}
                    quality="85"
                    // 遅延読み込みしない
                    loading={'eager'}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <div className={s.item}>
          <p>{detail.vendor}</p>
          <p>{detail.title}</p>
          <p>¥{detail.variants[0].price}</p>
          <br />
          <article
            className={s.item__description}
            dangerouslySetInnerHTML={{
              __html: `${detail.descriptionHtml}`,
            }}
          />
          <AddCart skuList={detail.variants as Sku[]} />
        </div>
      </div>
    </>
  )
}

export default Detail
