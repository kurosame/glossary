## category

other

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
