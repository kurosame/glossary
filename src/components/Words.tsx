import Word from '@/components/Word'
import { IWordState } from '@/modules/word'
import GridList from 'material-ui/GridList'
import React from 'react'

interface IProps {
  words: IWordState[]
}

export default class Words extends React.Component<IProps> {
  public render() {
    return (
      <GridList cols={1}>
        {this.props.words.map(w => <Word key={w.id} word={w} />)}
      </GridList>
    )
  }
}
