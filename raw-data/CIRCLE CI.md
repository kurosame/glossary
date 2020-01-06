## category

ci

## titles

CircleCI

## description

<a href="https://qiita.com/kurosame/items/767e1bac76e78267cf5d" target="_blank">CircleCI から Firebase にデプロイしたり、ファイルアップしたりする</a>

### node_modules のキャッシュ

package-lock.json の checksum をキーにして node_modules のキャッシュを保存

```yml
- save_cache:
    name: Cache dependencies
    paths:
      - node_modules
    key: v1-dependencies-{{ checksum "package-lock.json" }}
```

```yml
- restore_cache:
    name: Download and cache dependencies
    keys:
      - v1-dependencies-{{ checksum "package-lock.json" }}
      - v1-dependencies-
```

上記コードの keys は以下の意味をもつ  
`v1-dependencies-{{ checksum "package-lock.json" }}`は package-lock.json の checksum を取得して、該当のキャッシュを取得する  
つまり、キャッシュがあれば、`npm install`でのパッケージのインストールは省略される

`v1-dependencies-`は、上記でキャッシュが無い場合に実行される  
つまり、完全一致のキャッシュは無いが、この文字列で検索し、一致した最新のキャッシュを取ることで、`npm install`でのパッケージのインストールを最小限の差分更新でできるようにしている

npm を使っている場合、`npm ci`を使うと良い  
ただし、`npm ci`は実行後 node_modules を全て削除してしまうため、上記のコードだとキャッシュできない  
`npm ci`を使う時は、node_modules ではなく、`~/.npm`をキャッシュすると良い
