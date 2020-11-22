## category

ci

## titles

GitHub Actions

## description

### node_modules のキャッシュ

package-lock.json のハッシュ値をキーにして npm のキャッシュを保存

```yml
- name: Cache dependencies
  uses: actions/cache@v2
  with:
    path: ~/.npm
    key: ${{ runner.os }}-npm-${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      ${{ runner.os }}-npm-
      ${{ runner.os }}-
```

CircleCI と違い、キャッシュのセーブとリストアを分けて書かなくてよい  
key に設定した値で保存し、復元も key の値で完全一致検索して行う  
restore-keys には key の完全一致検索で見つからなかった用の部分一致の条件を書いておく
