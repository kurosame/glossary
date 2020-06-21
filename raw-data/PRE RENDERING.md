## category

build

## titles

Pre Rendering

## description

webpack などで事前に静的 HTML へレンダリングしておく（キャッシュしておく）

以下の流れで動いている？

1. PhantomJS のインスタンスを作成し、アプリを実行
1. DOM のスナップショットを取得
1. スナップショットをビルドの output フォルダーに出力

### Vue.js

以下で webpack に組み込める  
prerender-spa-plugin
