## category

react

## titles

React Native

## description

Android と iOS を動かすために Safari の JS エンジンである JavaScriptCore(JSC)を採用  
Android に関しては`facebook/android-jsc`という Android 用の JSC にポーティングすることで動作させている  
React Native に DOM API や window.document は無い  
JSC はバックグラウンドのシングルスレッドで動く  
ネイティブの View は UI スレッドからしか更新できないので、バックグラウンドで動いている react-reconciler の更新命令をネイティブの View へ伝える必要がある  
この解決に、React Native 側で DOM ツリーの代わりになる ShadowView ツリーをもつことにした

### 更新の流れ

1. react-reconciler が VDOM の差分を算出
1. バックグラウンド側で ShadowView ツリーの追加内容をキューに保持（バックグラウンド側の処理完了）
1. UI スレッド側でキューから情報を取得し、View を更新する
