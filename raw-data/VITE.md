## category

build

## titles

Vite

## description

Snowpack と同様なノーバンドルのビルドツール  
Vue.js 作者の Evan You 氏が開発中  
Vue.js だけではなく、React や Preact をサポート

### 環境ごとの違い

- 開発環境
  - esbuild で TS から JS へトランスパイルする
  - ESM で動く
    - CJS は ESM に変換する
- 本番環境
  - Rollup を使ってバンドルする
  - バンドルされていない ESM を本番用に使うことは、現状、通信速度的に非効率
    - webpack などで Tree Shaking、モジュール分割などの技術を使いバンドルするのが無難

本番環境は webpack のまま、開発環境のみ Vite に移行する技術判断はあり

### 開発環境と本番環境の差異の問題

Vite は、esbuild でバンドルまではしていない  
よって、以下のように開発環境と本番環境で差異があるため、ビルド結果が一致しない可能性がある

- 開発環境
  - esbuild でビルドするが、ノーバンドル
- 本番環境
  - Rollup でバンドル

上記を解決するために Rolldown が開発中  
Rolldown は、esbuild と Rollup の両方を置き換える目的で開発されている
