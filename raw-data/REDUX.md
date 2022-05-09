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
action が来るたびにすべての reducer に通知して、reducer は興味がある action のみを捕まえて更新処理をする

### Middleware

ある event-stream（observable）を別の event-stream に変換する  
1 つの action が複数の action に変換されたり、middleware 内部で状態を持ったりする

### 非同期処理について

Redux は非同期処理をサポートしていないため、別途インストールする必要がある

- redux-thunk
  - Redux 開発チームが推奨している
  - Redux Toolkit に標準で組み込まれている
- redux-saga
  - Generator 構文
  - テストしやすい
  - TypeScript のサポートが微妙

### useReducer との違い

Redux の場合は State の管理をグローバルに行う  
useReducer の場合は State の管理をコンポーネントの中だけ（ローカル）で行う

親子関係以外のコンポーネントと State の共有が必要になった場合、Redux がないとキツい  
小規模なシステムであれば Redux を導入せず、useReducer と useContext の組み合わせでよい
