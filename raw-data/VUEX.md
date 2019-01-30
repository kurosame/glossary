## category

vue

## titles

Vuex

## description

Vuex は Flux の以下の 2 つの原則に沿って実装されている

- Single Source of Truth  
  グローバルなデータは 1 つの場所で管理すべきであり、それが Store である
- Read Only Data  
  Store 内のデータは Read Only であり、更新する場合は決まった手続き（Mutation 経由で更新）を取る必要がる

Vuex は State, Getters, Mutations, Actions の 4 つの概念を持つ

### State

State は Store 内に定義され、State が更新されれば、その State を使っている全てのコンポーネントは再レンダリングされる

### Getters

Getters は Vue.js の computed に似ている  
State を受け取り、フィルタリングして、return する

### Mutations

State を更新できる唯一の場所  
Mutation をコミットすることで Mutation 内に定義したハンドラーを呼び出して State を更新する

### Actions

Mutation をコミットする関数を持つ

Mutations と似ているが、2 つの大きな異なる点がある

- Mutations は同期処理だが Actions は非同期処理をサポートしている
- Mutations は単純だが Actions は複雑化しやすい

Redux の場合は非同期処理をサポートしておらず、redux-thunk や redux-saga などの他のライブラリを使用する必要がある

### Vuex で管理するべきデータ

Vuex(や Redux) によって一元管理されているが、結局 State とそれを管理する Store はどこからでもアクセスできるグローバル変数のようなもの  
よって Store に入れるデータは限定すべきで、入れる必要が無いデータはコンポーネントのローカル State で保持するべき

### 非同期処理

<a href="https://qiita.com/kurosame/items/7f4a039d1c8a72df543f" target="_blank">Vuex で async/await を使いたい時の書き方</a>
