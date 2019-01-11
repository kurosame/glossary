import Words from '@/components/Words'
import React from 'react'

interface IProps {
  match: { params: { category: string } }
}

const List = (props: IProps) => <Words category={props.match.params.category} />

export default List
