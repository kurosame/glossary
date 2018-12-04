## category

css

## titles

Autoprefixer

## description

こちらのサイトで CSS プロパティがどのブラウザでサポートされているか出してくれる  
http://caniuse.com

上記サイトでサポートされてないブラウザを使う場合は、ベンダープレフィックス（-webkit-や-ms-）の対応が必要になる  
ベンダープレフィックスを全てつけて解決を試みる手もあるが、コード量が膨大になるから普通はやらない

上記のことを毎回考えることなく対応してくれるようにしたのが、Autoprefixer  
https://github.com/postcss/autoprefixer

Autoprefixer は「Can I use」の情報を利用して、必要なベンダープレフィックスを自動で付与してくれるもの

以下のようにブラウザの対象バージョンを細かく指定できる  
このようにすることで、コンパイル時に Autoprefixer による無駄なベンダープレフィックスの付与を防げる

```json
browsers: ['last 2 versions', 'ie >= 9', 'Android >= 4', 'ios_saf >= 8']
```
