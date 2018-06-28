import Word from '@/components/Word'
import { IWordState } from '@/modules/word'
import { List, ListItem } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'

interface IProps {
  words: IWordState[]
}

export default class Words extends React.Component<IProps> {
  public render() {
    return (
      <List>
        {this.props.words.map(w => (
          <ListItem key={w.id}>
            <WordDiv>
              <Word word={w} />
            </WordDiv>
          </ListItem>
        ))}
      </List>
    )
  }
}

const WordDiv = styled.div`
  width: 100%;
`
