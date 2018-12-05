## category

react

## titles

React Fiber
react-fiber

## description

Begin, Complete, Commit のフェーズがある

### Begin, Complete

Component 単位で実行される  
componentWillMount, componentWillReceiveProps, shouldComponentUpdate, componentWillUpdate  
非同期レンダリングでは中断・再開により、複数回ライフサイクル関数が呼ばれる可能性がある

### Commit

全ての Fiber が完了した時に実行される  
DOM 更新などの副作用が発生する処理はここでまとめて反映される  
componentDidMount, componentDidUpdate, componentWillUnmount

### Time Slicing

Fiber により画面のレンダリングが非同期になると、Fiber 単位で処理の優先度を付けることができる  
例えばユーザ操作の優先度を高くすることで、画面がレンダリング中でもユーザ操作を優先して処理することが可能となる

### Suspense

非同期通信をしている間、画面のレンダリングを中断できる  
非同期通信が完了した後に、画面をレンダリングすることが可能  
render に Promise を投げて、その Promise が完了した後に render するみたいな？
