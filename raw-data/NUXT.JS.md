## category

vue

## titles

Nuxt.js

## description

<a href="https://qiita.com/kurosame/items/80437d5387cb253f2c1e" target="_blank">はじめての Nuxt.js</a>

<a href="https://zenn.dev/kurosame/articles/52e96b724380d2" target="_blank">Nuxt の target、mode、ssr、各 npm コマンドについて</a>

<a href="https://qiita.com/kurosame/items/255480a37548d5c04c7d" target="_blank">Nuxt で IT イベント検索アプリを作成した</a>

<a href="https://qiita.com/kurosame/items/bc7bb26ecfd36e8d1048" target="_blank">Nuxt.js + Jamstack 構成において、動的コンテンツを処理する方法</a>

<a href="https://kurosame-th.hatenadiary.com/entry/2020/12/01/175041" target="_blank">Nuxt.js で Vuex を使わない場合に考えること</a>

### assets と static の違い

- assets  
  Sass など webpack の loader を使って処理したいファイルはこちらに置く
- static  
  ここに置かれたファイルは公開ディレクトリにそのまま置かれる  
  プロジェクトのルート URL からアクセス可能  
  webpack などで処理する必要のないファイルを置く

### `nuxt.config.js`

- modules  
  Nuxt のモジュールを定義  
  dependencies でインストールする

- buildModules  
  Nuxt の開発用のモジュールを定義  
  devDependencies でインストールする
