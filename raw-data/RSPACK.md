## category

build

## titles

Rspack

## description

モジュールバンドラー

- Rust 製で高速
- インクリメンタルビルド（変更された部分だけをコンパイル）を採用しているため、HMR が高速
- webpack と互換性がある（100%の互換性は目指していない）
- トランスパイルはデフォルトだと SWC
  - Babel はパフォーマンス的観点から非推奨だが、babel-loader の使用はサポートしている
- 開発用サーバーは組み込まれている
  - config の設定内容は、webpack-dev-server と似ている
