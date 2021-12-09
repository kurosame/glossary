## category

browser

## titles

Googlebot

## description

2019 年 Googlebot に最新の Chrome と同等のレンダリングエンジンを使用することが発表された

Googlebot のクローラーが見る指標は以下

- サイトの安定性
  - 500 系エラーなど起きずに閲覧できること
- サイトのレスポンス速度が速い
- サイトのレンダリング速度が速い
- Core Web Vitals

上記を満たしていないサイトは Googlebot にインデックスされる機会を損失する（Googlebot の訪問頻度が減る）  
Googlebot はサイトのリソース（HTML,JS,CSS）をダウンロードし、それをレンダリングし、その結果を基にスコア付けを行い、最終的にインデックスに反映する

### 以下は Googlebot の古い仕様だったころのもの

Googlebot は、Chrome 41 程度の機能しか持っていない  
Chrome 41 だと ES6 の機能はほとんどサポートされていない  
よって、SEO 対策として、Chrome 41 でも動くように対策しないと Googlebot にインデックスしてもらえない

以下のように`.babelrc`で記述すれば良い

```json
{
  "presets": [
    [
      "env",
      {
        "targets": {
          "browsers": ["Chrome >= 41"]
        }
      }
    ]
  ]
}
```

現状 Googlebot のレンダリング能力は完璧でないため、レンダリングさせないことが 1 番である  
サーバーサイドレンダリングを行い、レンダリング不要な静的な HTML を返すことがインデックス登録には最適である

2019 年 Googlebot に最新の Chrome と同等のレンダリングエンジンを使用することが発表された  
よって、上記の対応は不要になるはず
