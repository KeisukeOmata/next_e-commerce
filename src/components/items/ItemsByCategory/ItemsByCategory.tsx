import { FC, useState, useEffect, useRef } from 'react'
import { Item } from 'components/items'
import { TypeItem } from 'lib/Type'
import { useRecoil } from 'lib/hooks/useRecoil'
import s from './ItemsByCategory.module.scss'

type Props = {
  items: TypeItem[]
}

export const ItemsByCategory: FC<Props> = ({ items }) => {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLHeadingElement | null>(null)
  const { getCategoryState, getFocusItemState } = useRecoil()
  const categoryState = getCategoryState()
  const focusItemState = getFocusItemState()

  useEffect(() => {
    if (count == 0) {
      // Focus on main when the parent component is rendered.
      setCount(1)
    } else {
      // Focus on heading element when the child component is rendered.
      ref.current?.focus()
    }
  }, [categoryState, count])

  if (categoryState == 'ALL') {
    return (
      <>
        <div className={s.categorySectionTitleContainer}>
          <h2 ref={ref} tabIndex={-1}>
            ALL
          </h2>
        </div>
        <div className={s.items}>
          {items
            .slice(0)
            .reverse()
            .map((item, i) => (
              <Item
                key={`post-item-${i}`}
                item={item}
                focused={focusItemState == item.id}
              />
            ))}
        </div>
      </>
    )
  } else if (categoryState === '新着') {
    return (
      <>
        <div className={s.categorySectionTitleContainer}>
          <h2 ref={ref} tabIndex={-1}>
            新着
          </h2>
        </div>
        <div className={s.items}>
          {items
            .slice(-10)
            .reverse()
            .map((item, i) => (
              <Item
                key={`post-item-${i}`}
                item={item}
                focused={focusItemState == item.id}
              />
            ))}
        </div>
      </>
    )
  } else {
    return (
      <>
        <div className={s.categorySectionTitleContainer}>
          <h2 ref={ref} tabIndex={-1} className={s.homeSectionTitle}>
            {categoryState}
          </h2>
        </div>
        <div className={s.items}>
          {items
            .slice(0)
            .reverse()
            .map(
              (item, i) =>
                item.productType == categoryState && (
                  <Item
                    key={`post-item-${i}`}
                    item={item}
                    focused={focusItemState == item.id}
                  />
                )
            )}
        </div>
      </>
    )
  }
}
