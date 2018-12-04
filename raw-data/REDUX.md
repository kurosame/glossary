## category

react

## titles

Redux

## description

### Action

Action.type と処理に必要な値を保持したプレーンオブジェクト

```js:Actionの例
const SET_SAMPLE = {
  type: 'SET_SAMPLE',
  name: 'sample'
}
```

### ActionCreator

Action を動的に生成する関数

### Reducer

純粋関数（入力に対して結果が一意）である  
非同期処理は扱えず、同期的な状態更新を行う  
現 state と 1 つの action を取って、次の state を確定する  
combineReducers で複数の reducer を束ねて 1 つの reducer にする  
action が来る度に全ての reducer に通知して、reducer は興味がある action のみを捕まえて更新処理をする

### Middleware

ある event-stream（observable）を別の event-stream に変換する  
1 つの action が複数の action に変換されたり、middleware 内部で状態を持ったりする
