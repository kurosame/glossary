## category

package-manager

## titles

Monorepo

## description

複数の npm パッケージを単一の git リポジトリで管理すること

たとえば babel だと以下のように複数パッケージが 1 つのリポジトリで管理されている  
<a href="https://github.com/babel/babel/tree/master/packages" target="_blank">babel/packages</a>

### `packages/...`配下の package.json に記載してほしいが、インストールしたパッケージはルートの node_modules に入れてほしい場合

たとえば、Lint 系のパッケージは`packages/eslint-config-custom`の package.json で管理したいが、コマンドはルートで実行するため、パッケージ自体はルートの node_modules にインストールしてほしい時  
（`packages/eslint-config-custom`でインストールすると、`packages/eslint-config-custom/node_modules`にインストールされてしまうため、ルートで eslint コマンドを実行すると、パッケージがインストールされていないエラーになる）

以下は Turborepo の場合の例

1. `packages/...`で`npm install`
   - この時は`packages/.../node_modules`にインストールされているはず
1. ルートで`npm install`
   - `packages/...`でインストールした時とバージョンを同じする
   - この時、ルートの node_modules にインストールされているはず
1. ルートでインストールしたパッケージを`npm uninstall`する
   - この時、ルートの package.json からは削除されるが、ルートの node_modules にパッケージがインストールされているはず
