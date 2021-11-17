import Words from '@/components/Words'
import type { States } from '@/modules/states'
import { GET_WORDS, WordState } from '@/modules/word'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { Dispatch } from 'redux'

interface Props {
  match: { params: { category: string } }
}

const useGetWords = (ws: WordState[]): void => {
  const dispatch = useDispatch<Dispatch>()
  useEffect(() => {
    if (!ws.length) dispatch({ type: GET_WORDS })
  }, [ws, dispatch])
}

const List: React.FC<Props> = p => {
  const isLogin = useSelector<States, boolean>(s => s.login.isLogin)
  const words = useSelector<States, WordState[]>(s => s.words)

  useGetWords(words)

  if (!isLogin) return null
  return <Words words={words.filter(w => !p.match.params.category || w.category === p.match.params.category)} />
}

export default List
