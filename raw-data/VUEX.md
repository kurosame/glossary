## category

vue

## titles

Vuex

## description

Action 内で非同期処理をサポートしている  
Redux の場合は非同期処理をサポートしておらず、redux-thunk や redux-saga などの他のライブラリを使用する必要がある

### Vuex で管理するべきデータ

Vuex(や Redux) によって一元管理されているが、結局 State とそれを管理する Store はどこからでもアクセスできるグローバル変数のようなもの  
よって Store に入れるデータは限定すべきで、入れる必要が無いデータはコンポーネントのローカル State で保持するべき

### 非同期処理

<a href="https://qiita.com/kurosame/items/7f4a039d1c8a72df543f" target="_blank">Vuex で async/await を使いたい時の書き方</a>
