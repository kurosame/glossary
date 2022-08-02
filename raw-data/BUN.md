## category

js

## titles

Bun

## description

2022/07 に公開された JavaScript と TypeScript のランタイム環境  
Jarred Sumner によって開発された  
Node や Deno と同じ立ち位置

Bun の特徴は以下

- バンドラー、トランスパイラーが組み込まれている
  - TypeScript や JSX でも動く
- NodeAPI と互換性を意識して作られている
  - 現時点（2022/08）では互換性は微妙
- JavaScriptCore エンジン（WebKit）で動いている
  - JavaScriptCore は、WebKit にビルトインされている JS エンジン
  - V8 などより起動と実行が若干速いらしい
- Zig 言語で書かれている
- Bun でパッケージのインストールができる
  - npm や yarn のように
