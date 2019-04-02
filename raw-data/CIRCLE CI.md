## category

ci

## titles

CircleCI

## description

<a href="https://qiita.com/kurosame/items/767e1bac76e78267cf5d" target="_blank">CircleCI から Firebase にデプロイしたり、ファイルアップしたりする</a>

### node_modules のキャッシュ

package.json の checksum をキーにして node_modules のキャッシュを保存

```yml
- save_cache:
    name: Cache dependencies
    paths:
      - node_modules
    key: v1-dependencies-{{ checksum "package.json" }}
```

```yml
- restore_cache:
    name: Download and cache dependencies
    keys:
      - v1-dependencies-{{ checksum "package.json" }}
      - v1-dependencies-
```

上記コードの keys は以下の意味をもつ  
`v1-dependencies-{{ checksum "package.json" }}`は、普通に package.json の checksum を取得して、該当のキャッシュを取得する  
つまり、キャッシュがあれば、`yarn install`でのパッケージのインストールは省略される

`v1-dependencies-`は、上記でキャッシュが無い場合に実行される  
つまり、該当のキャッシュは無いが、別の checksum で保存した最新のキャッシュを取ることで、`yarn install`でのパッケージのインストールを最小限の差分更新でできるようにしている
