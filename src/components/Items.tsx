import React from 'react'
import { TypeItem } from '../types/TypeItem'
import Item from './Item'
import Grid from '@material-ui/core/Grid'
// import styles from '../styles/components/Items.module.scss'

type Props = {
  items: TypeItem[]
}

const Items: React.FC<Props> = ({ items }) => {
  return (
    <>
      <title>e-commerce</title>
      <h1>商品一覧</h1>
      <Grid container spacing={1}>
        {items.map((item) => (
          <Grid item xs={6} lg={3} key={item.id}>
            <Item item={item} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default Items
