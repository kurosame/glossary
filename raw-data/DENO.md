## category

language

## titles

Deno

## description

Node.js 製作者の Ryan Dahl によって作成された JavaScript と TypeScript のランタイム環境

Deno は直接 TypeScript を実行できる（`deno run https://deno.land/std/examples/welcome.ts`）  
Node は`tsc`で事前にコンパイルして実行する必要があったが、Deno は実行時にコンパイルしてくれる

Deno は当初 Go で実装されていたが、速度と GC の懸念から Rust で再実装された

Deno の標準ライブラリは Go をモデルとしている  
Go のように URL で NPM パッケージをインストールできる（`npm install`する必要がない）  
パッケージ管理ツールとしての NPM はもう必要なくなる

Deno にバンドラー、フォーマッター、テストランナーが同梱されているので、別途インストールする必要がない
