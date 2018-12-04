## category

package-manager

## titles

npm
npm ci

## description

npm 5.7 で追加されたコマンド  
package-lock.json のみからインストールする  
ただし、package.json とのバージョンに差異があった場合（package.json だけバージョンを上げるなど）はエラーにする  
`npm install`の場合は package.json と package-lock.json の両方から依存関係を解決しインストールする

`npm install`に比べて`npm ci`は依存関係の解決が無い分多少速い
