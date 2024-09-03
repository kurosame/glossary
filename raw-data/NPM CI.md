## category

package-manager

## titles

npm
npm ci

## description

npm 5.7 で追加されたコマンド  
package-lock.json のみからインストールする  
実行後、node_modules の中身をいったんすべて削除してから、依存パッケージのダウンロードを行う  
package.json とのバージョンに差異があった場合（package.json だけバージョンを上げるなど）はエラーにする

`npm install`の場合は package.json と package-lock.json の両方から依存関係を解決しインストールする  
また、`npm install`は必要に応じて package-lock.json を勝手に更新してしまう可能性がある  
たとえば、`"next": "^14.0.0"`と package.json に書かれているのに package-lock.json では`13.0.0`がインストールされている場合は、package-lock.json を v14 のマイナーバージョンの最新に更新する  
（`npm ci`の場合は更新されずにエラーになる）
