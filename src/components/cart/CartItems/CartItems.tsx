/* eslint-disable jsx-a11y/no-onchange */
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { Button } from 'components/ui'
import { useCart } from 'lib/hooks/useCart'
import { resetCheckoutId, getColorAndSize } from 'lib/helpers'
import { Cart } from 'lib/Type'
import s from './CartItems.module.scss'

export const CartItems: FC = () => {
  const { cart, changeQuantity, removeItem } = useCart()
  const moveToShopify = (cart: Cart): void => {
    // Move to Shopify
    window.open(cart.webUrl)
    // Delete checkoutId from local storage
    resetCheckoutId()
  }

  return (
    cart && (
      <>
        {cart.lineItems.length === 0 ? (
          <div className={s.cartSectionTitleContainer}>
            <h2>BAGが空です</h2>
          </div>
        ) : (
          <>
            <div className={s.cartSectionTitleContainer}>
              <h2>BAG</h2>
            </div>
            {cart.lineItems.map((item) => (
              <div className={s.items} key={item.id}>
                <div className={s.item}>
                  <Link href={`/items/${item.variant.product.id}`}>
                    <button aria-label={`${item.title}のページを表示する`}>
                      <Image
                        src={item.variant.image.src}
                        alt={item.variant.image.altText || 'Item Image'}
                        width={500}
                        height={500}
                        quality="85"
                      />
                    </button>
                  </Link>
                </div>
                <div className={s.item}>
                  <div className={s.item__detail}>
                    <p>{item.title}</p>
                    <div>
                      {/* Color:{' '} */}
                      {getColorAndSize(item.variant.selectedOptions, 'Color')}
                    </div>
                    <div>
                      {/* Size:{' '} */}
                      {getColorAndSize(item.variant.selectedOptions, 'Size')}
                    </div>
                  </div>
                  <div className={s.item__detail}>
                    <p>¥{item.variant.price}</p>
                  </div>
                  <div className={s.item__detail}>
                    個数：
                    <select
                      className="text-black"
                      defaultValue={item.quantity}
                      onChange={(e) => changeQuantity(item.id, e.target.value)}
                    >
                      {[...Array(10).keys()].map((number) => {
                        const value = number + 1
                        return (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        )
                      })}
                    </select>
                  </div>
                  <div className={s.item__detail}>
                    <p>
                      小計： ¥{parseInt(item.variant.price) * item.quantity}
                    </p>
                  </div>
                  <br></br>
                  <div className={s.item__detail}>
                    <Button
                      shape="square"
                      type="button"
                      aria-label="カートから商品を削除する"
                      onClick={() => removeItem(item.id)}
                    >
                      削除
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            <div className={s.item}>
              <p className={s.item__price}>合計: ¥{cart.subtotalPrice}</p>
            </div>
            <div className={s.item}>
              <Link href={`/`}>
                <Button
                  shape="square"
                  type="button"
                  aria-label="お会計に進む"
                  onClick={() => moveToShopify(cart)}
                >
                  購入する
                </Button>
              </Link>
            </div>
          </>
        )}
      </>
    )
  )
}
