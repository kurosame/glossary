## category

vue.js

## titles

Vue.js

## description

### data と methods と computed

data はコンポーネントのローカル変数  
methods は関数  
computed はプロパティ（値に変数も関数も定義できる）

computed はデフォルトでは getter 関数のみだが、setter 関数も定義できる  
setter 関数を書かなければ、外部から変更不可のプロパティを定義できる  
変数や関数は data や methods よりも computed で定義した方が良い  
computed はキャッシュも効く

### computed が再評価される仕組み

computed のプロパティは Vue インスタンスを作成する際に、Watcher を生成している  
computed 内で data で定義した変数を使っていた場合、この変数の変更を Watcher に通知している  
そして、computed のプロパティが再評価される

data で定義した変数の変更の検知は、Object.defineProperty 内の setter で Watcher に通知する処理を書いている

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

### 更新時に不要なコンポーネントのレンダリングを防ぐには

React でいう PureComponent や shouldComponentUpdate 的なものは無いのか？  
⇒ 無いというか不要  
ディレクティブの条件でレンダリングを制御すれば良いという考え

### TypeScript のサポート

- Vue.js v2.4 以前  
  Vue.js はオブジェクトリテラルベース（{key: value}形式）の言語の為、this の推論ができなかった  
  よって`vue-class-component`を用いてクラスベースの構文にする必要があった

- Vue.js v2.5 以降  
  TypeScript のサポートにより、オブジェクトリテラルベースでも this の推論ができるようになった

### React との比較

- データの更新について  
  Vue.js の場合、data に state を定義し、this で直接変更できる  
  React の場合、必ず setState 関数経由で state を更新する  
  React の方が値を直接変更しない点で良く見える  
  Vue.js で同じことをやりたいならば、computed の setter 関数を活用すれば良さそう
