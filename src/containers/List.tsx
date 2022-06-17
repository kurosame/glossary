import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import type { Dispatch } from 'redux'

import Words from '@/components/Words'
import type { States } from '@/modules/states'
import { GET_WORDS, WordState } from '@/modules/word'

const useGetWords = (ws: WordState[]): void => {
  const dispatch = useDispatch<Dispatch>()
  useEffect(() => {
    if (!ws.length) dispatch({ type: GET_WORDS })
  }, [ws, dispatch])
}

const List: React.FC = () => {
  const isLogin = useSelector<States, boolean>(s => s.login.isLogin)
  const words = useSelector<States, WordState[]>(s => s.words)
  const { category } = useParams()

  useGetWords(words)

  if (!isLogin) return null
  return <Words words={words.filter(w => !category || w.category === category)} />
}

export default List
