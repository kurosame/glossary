## category

package-manager

## titles

Yarn

## description

Node.js 上で動く  
npm と違い、Yarn は別途インストールが必要

Yarn は専用のレジストリを持っているわけではなく、npm のレジストリを使用する  
Yarn は package.json と互換性があると言える

### npm v4 時代

- Yarn の方が速い
- yarn.lock によるバージョン管理（npm-shrinkwrap.json と違い、インストール時にデフォルトで常に作成）

### npm v5 時代

- 速度が改善された（ただし、Yarn の方がまだ速い）
- yarn.lock に相当する package-lock.json が作られるようになった

### グローバル領域（global install）

`~/.config/yarn/global`

### Yarn を使う理由

今の所以下理由から Yarn を使っている（2017/11/21）

- Yarn の方が npm（v5 以降であっても）より速い
- たぶん Yarn の方が依存モジュール解決がフラットで綺麗  
  npm ls と Yarn list を比べた結果見てもそんな感じがする

### `yarn install`

yarn.lock を基にパッケージをインストールする  
package.json を直接編集した場合などは必要に応じて yarn.lock も更新する

### `yarn upgrade [...package]`

package.json で指定された通り（^や~も考慮）にパッケージを更新する  
yarn.lock も再作成する  
1 つもしくは複数のパッケージを指定可能  
[package@version or tag]という書き方でバージョンやタグも指定可能
