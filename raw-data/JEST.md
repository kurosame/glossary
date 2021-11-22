## category

js

## titles

Jest

## description

<a href="https://kurosame-th.hatenadiary.com/entry/2020/08/26/170050" target="_blank">moxios を廃止して Jest.Mock に移行する</a>

### jest.fn, jest.mock, jest.spyOn

- jest.fn  
  関数をモック化する

- jest.mock  
  モジュールをモック化する

- jest.spyOn  
  ある特定の関数をモック化するが、オリジナルの元々の機能は使えるようにする

```js
// オリジナルのconsole.errorの機能は使える
const spyErr = jest.spyOn(console, 'error')
// オリジナルのconsole.errorの返却値を変える
// この状態でconsole.errorはspyを返すようになる
spyErr.mockImplementation(() => 'spy')
// オリジナルのconsole.errorの機能に戻す
spyErr.mockRestore()
```

```ts
// 以下をモックするケースを考える
import { setWords } from '@/modules/word'
if (setWords) else

// 以下をテストファイルのトップに書くことで、setWordsをundefinedにすることができる
// よって、上記のelseパターンのテストが可能
// ただし、トップレベルで以下をモック化する必要があるので、ifとelseの両方のテストを同一ファイル内で実現することは不可能
jest.mock('@/modules/word', () => ({
  setWords: undefined
}))

// 以下でsetWordsの実装を書き換えることができる
// また、mockReturnValueで戻り値を変えることも可能
// ただし、setWords自体がundefinedになるわけではないので、上記のelseパターンのテストは不可能
// mockImplementationでもmockReturnValueでも以下の場合、setWordsはundefinedを返すMock型関数となる
jest.spyOn(require('@/modules/word'), 'setWords').mockImplementation(() => undefined)

// よって、上記のif-else両パターンのテストは同一ファイル内では不可能と思われる
```
