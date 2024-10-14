## category

package-manager

## titles

JSR
JavaScript Registry

## description

Deno 製の JS のパッケージ管理ツール  
以下の点で npm と差別化を図っている

- レジストリ全体がオープンソース
  - <a href="https://github.com/jsr-io/jsr" target="_blank">github.com/jsr-io/jsr</a>
  - ちなみに npm レジストリはオープンソースではない
- TypeScript をサポート
  - ts ファイルを JSR に Publish 時に自動でドキュメント、型定義、トランスパイルを行ってくれる
- ESM のみサポート
- Deno、Bun、Node.js をサポート
  - Node.js で使う場合は、JSR が自動でビルドして node_modules に置いてくれる
