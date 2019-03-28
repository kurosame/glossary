## category

vue

## titles

Vue.js

## description

<a href="https://qiita.com/kurosame/items/b3f5bee8ea73df025cb1" target="_blank">Vue2 のディレクトリ構成を考える</a>

<a href="https://qiita.com/kurosame/items/183a93bcc39d4c8c27d5" target="_blank">Vue.js とその周辺技術を学ぶ勉強会</a>

<a href="https://qiita.com/kurosame/items/1e8754fceeba9b9bfcd1" target="_blank">Vue.js を最速でビルドして、無料で公開するぞ！[ハンズオン形式]</a>

### data と methods と computed

<a href="https://kurosame-th.hatenadiary.com/entry/2019/03/28/153813" target="_blank">Vue.js の data と methods と computed の使い分けについて</a>

### scoped

CSS を現在のコンポーネントの要素にのみ適用できる  
scoped を付けないとグローバルスコープの CSS となる

子コンポーネントのルート要素は親のスタイルを受け継ぐ  
以下のケースの場合、子のルート要素のスタイル名が親のスタイル名と同じため  
子のルート要素のスタイルが親のスタイルの影響を受ける  
ちなみにこれは仕様

```html
<!-- parent.html -->
<template>
  <div class="sample"><child></child></div>
</template>
```

```html
<!-- child.html -->
<template>
  <div class="sample">...</div>
</template>
```

解決策として

- 子のルート要素にスタイルを書かない（1 段階ネストしてルート要素を`<div>`にするなど）
- スタイル名を重複させない（vuejs-boilerplate ではルート要素のスタイル名をファイル名にすることで重複を防いでいる）
- CSS Modules にする

### module

CSS モジュールを使える

### ライフサイクル

<a href="https://qiita.com/kurosame/items/6ab7622fe30c299a693e" target="_blank">Vue.js のライフサイクルメモ</a>

### Server Side Rendering

<a href="https://qiita.com/kurosame/items/9815a28820e5e63d1a55" target="_blank">Vue.js でサーバサイドレンダリングしたい</a>

### 更新時に不要なコンポーネントのレンダリングを防ぐには

React でいう PureComponent や shouldComponentUpdate 的なものは無いのか？  
⇒ 無いというか不要  
ライブラリ内部で再レンダリングが必要なコンポーネントを自動的に判断しているらしい  
また、ディレクティブの条件でレンダリングを制御すれば良いという考え

### TypeScript のサポート

- Vue.js v2.4 以前  
  Vue.js はオブジェクトリテラルベース（{key: value}形式）の言語の為、this の推論ができなかった  
  よって`vue-class-component`を用いてクラスベースの構文にする必要があった

- Vue.js v2.5 以降  
  TypeScript のサポートにより、オブジェクトリテラルベースでも this の推論ができるようになった

### Higher-Order Components

<a href="https://qiita.com/kurosame/items/ad02af3e15e608a1c724" target="_blank">Vue.js で HOC 的なことをやりたい</a>

### ユニットテスト

<a href="https://qiita.com/kurosame/items/8d82ef8d36c106c6e8bc" target="_blank">Vue.js のテストをモダンにする</a>

### React との比較

- データの更新について  
  Vue.js の場合、data に state を定義し、this で直接変更できる  
  React の場合、必ず setState 関数経由で state を更新する  
  React の方が値を直接変更しない点で良く見える  
  Vue.js で同じことをやりたいならば、computed の setter 関数を活用すれば良さそう
