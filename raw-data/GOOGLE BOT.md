## category

browser

## titles

Googlebot

## description

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

現状 Googlebot のレンダリング能力は完璧ではないため、レンダリングさせないことが 1 番である  
サーバーサイドレンダリングを行い、レンダリング不要な静的な HTML を返すことがインデックス登録には最適である

2019 年 Googlebot に最新の Chrome と同等のレンダリングエンジンを使用することが発表された  
よって、上記の対応は不要になるはず
