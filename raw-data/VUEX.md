## category

vue.js

## titles

Vuex

## description

Action 内で非同期処理をサポートしている  
Redux の場合は非同期処理をサポートしておらず、redux-thunk や redux-saga などの他のライブラリを使用する必要がある

### Vuex で管理するべきデータ

Vuex(や Redux) によって一元管理されているが、結局 State とそれを管理する Store はどこからでもアクセスできるグローバル変数のようなもの  
よって Store に入れるデータは限定すべきで、入れる必要が無いデータはコンポーネントのローカル State で保持するべき
