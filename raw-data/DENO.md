## category

js

## titles

Deno

## description

Node.js 製作者の Ryan Dahl によって作成された JavaScript と TypeScript のランタイム環境

Deno は直接 TypeScript を実行できる（`deno run https://deno.land/std/examples/welcome.ts`）  
Node.js は`tsc`で事前にコンパイルして実行する必要があったが、Deno は実行時にコンパイルしてくれる

Deno は当初 Go で実装されていたが、速度と GC の懸念から Rust で再実装された

Deno の標準ライブラリは Go をモデルとしている  
Go のように URL で npm パッケージをインストールできる（`npm install`する必要がない）  
パッケージ管理ツールとしての npm はもう必要なくなる

Deno にバンドラー、フォーマッター、テストランナーが同梱されているので、別途インストールする必要がない

Node.js との互換性を重視した実装を今後は行っていくらしい（Node.js ユーザーを取り込む目的で）

### 2022/08 に Deno の方向性を変更するという記事が公開された

<a href="https://deno.com/blog/changes" target="_blank">Big Changes Ahead for Deno</a>

- Deno で npm を利用可能にする
  - npm による巨大なエコシステムを使えないと開発体験が非常に悪いため
- 最速の JS ランタイムを目指す
- 企業向けのユーザーサポートを強化する
  - Deno のアクティブユーザーの半数が仕事で Deno を利用しているという調査結果があるため

### Deno Deploy

- Edge コンピューティングサービスが使える
  - 日本は東京と大阪にリージョンを持つ
- GitHub 連携すると、push 時に自動的にデプロイ可能
- TypeScript がトランスパイルなしで動く

### Deno KV

- 保存データが分散されており、クライアントから近い Edge で利用可能
- Read 時に結果整合か強整合かを指定可能
  ```js
  // データが最新でない可能性があるが、取得は速い
  await db.get(['my-key'], { consistency: 'eventual' })
  // データは最新だが、取得は遅い
  await db.get(['my-key'], { consistency: 'strong' })
  ```
- トランザクションをサポート
