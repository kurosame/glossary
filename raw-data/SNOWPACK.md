## category

build

## titles

Snowpack

## description

webpack のようなモジュールバンドラーとはアプローチが異なるフロントエンドのビルドツール

`package.json`の依存関係を確認し、`web_modules`ディレクトリに依存ライブラリをそのままブラウザから利用できる形で格納する  
Snowpack は npm パッケージを ES Modules で読み込める形に変換する

Snowpack v1 の頃

- Snowpack はアプリケーション側には関与しない構成だった
- ES Modules として import できるようにするだけのライブラリ側に特化したツールだった

Snowpack v2 からは以下の機能などが追加された

- `snowpack dev`による組み込みサーバー
- CSS や画像の import が可能になった
- 型チェックや Lint 機能の追加

アプリケーションからインポートする場合は、以下のようにする  
~~`import React from '/web_modules/react.js`~~  
Snowpack v2 からは`import React from 'react'`で書けるようになった

従来のバンドルツールではアプリケーション側のファイルを変更するたびにバンドルファイルを作り直す必要があった  
Snowpack はバンドル自体が不要（ただし、TS などのトランスパイルは必要）
