## category

package-manager

## titles

Yarn
resolutions

## description

複数のパッケージであるパッケージに依存していた場合、バージョンが異なる場合がある  
`yarn list パッケージ名`で確認できる

package.json の resolutions フィールドでパッケージとバージョンを指定すると、バージョンを統一できる

```js:package.json
"resolutions": {
  "react": "16.3.2"
}
```

`yarn install --flat`を実行するとパッケージごとにどのバージョンを使うか選ぶことができ、  
resolutions に自動的に記載される
