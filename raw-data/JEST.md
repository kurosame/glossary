## category

js

## titles

Jest

## description

<a href="https://kurosame-th.hatenadiary.com/entry/2020/08/26/170050" target="_blank">moxios を廃止して Jest.Mock に移行する</a>

### jest.fn jest.mock jest.spyOn

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
