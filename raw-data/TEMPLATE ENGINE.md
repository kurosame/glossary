## category

js

## titles

Template Engine
テンプレートエンジン

## description

HTML とロジック部分を分けること  
HTML 内に動的テンプレートを用意し、必要になったら取得してテキストとして編集する  
EJS(.ejs)など

```html
<label><%- title %></label>
```

```js
this.$el.html(
  template({
    title: model.get('title')
  })
)
```

### DOM 直接操作

テンプレートエンジンに対して、DOM 直接操作とは  
HTML 内に静的テンプレートを用意し、必要になったら DOM 要素として編集する  
つまり jQuery などで DOM を直接編集すること

### メリット

- HTML と JavaScript が疎結合になる
- JavaScript がシンプルになる
- テストしやすい

### デメリット

- 文法の理解が必要
- HTML に特殊構文を埋め込むので見づらい
- ライブラリに依存する（Handlebars.js や Mustache.js など）
- 実行速度は落ちる
