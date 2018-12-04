## category

react

## titles

React Redux
react-redux

## description

Provider でラップしたコンポーネントに Store を流す  
connect で Store の state と dispatch を props にセットする

`<Provider store={store}>`のように Provider に store をセットすることで  
それより下の階層のコンポーネントで store から state と dispatch を取得できる状態にする

`connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])`  
connect では、Provider にセットした store から state の取得と、dispatch による Reducer の実行を可能にすること

### mapStateToProps

store が更新される度に呼ばれる  
引数に state を受け取る  
state を props にマッピングし、この props をコンポーネントで使う

### mapDispatchToProps

引数に Object（key に ActionCreator の名前、value に ActionCreator の関数）か Function を受け取る  
action を props にマッピングし、コンポーネントから dispatch できるようにする

### mergeProps

`Object.assign({}, ownProps, stateProps, dispatchProps)`  
デフォルトでは上記のように親から渡される props（ownProps）より、connect で state と dispatch で設定できる props が優先される  
これを避けたい場合とかにこちらに処理を書く
