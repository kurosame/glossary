## category

build

## titles

Rome

## description

JavaScript、TypeScript、JSON、HTML、Markdown、CSS 用にリンター、コンパイラー、バンドラーを一挙に提供するツールチェーン

`rome check`を実行するだけでリンター、フォーマッター、型チェックなどを一気に行える

webpack や ESLint や Prettier などがそれぞれパーサーを持つため、1 ファイルに対して実行するツールの数分、パーサーが走ることになる  
本来は 1 ファイルにパーサーは 1 回だけ実行すればよいという発想の元、Rome が作られた

以下の特徴がある

- ~~TypeScript で書かれている~~
  - 現在は Rust で再実装された
- Node.js 上で動作する
- ~~他パッケージとの依存がなく、Rome のみで動作する~~
  - zero dependency を目指したのは JS での話（安定性やパフォーマンス面の懸念を回避する目的）で、現在は Rust で再実装されたので、zero dependency を考慮する必要はなくなったとのこと

現在、Rome は開発が終了し、Rome をフォークして作られた Biome に開発が引き継がれている
