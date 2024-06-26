## category

js

## titles

TypeScript

## description

JavaScript のスーパーセット  
コンパイル時に静的型検査を行う  
tsc コマンドでコンパイルすると JavaScript に変換できる

<a href="https://qiita.com/kurosame/items/3c28f45c8b2e65f5c69d" target="_blank">JS から TS への移行で悩んだ点の対応メモ</a>

<a href="https://gist.github.com/kurosame/1da106ea75625329bae7b783ee4d14c3" target="_blank">Type Challenges</a>

### tsc

トランスパイルの対象は JS 構文のみ  
Promise などの組み込みのオブジェクトは変換できないため、Babel などで Polyfill をバンドルする必要がある

### 型アノテーション

`: 型名`で指定する

例

- `const num: number = 123`
- `function sum(num: number): number {}`

### 型定義

- 型定義ファイル（`.d.ts`）を管理するツール

  - TS1 時代  
    TSD, Typings（現在は共に非推奨）

  - TS2 から  
    npm で`@types/...`をインストール

- DefinitelyTyped(DT)  
  型定義ファイルの管理をしている団体  
  非営利組織

### `tsconfig.json`

- target  
  TS を JS にトランスパイルする際のどの ECMAScript のバージョンに変換させるかを指定する  
  モジュール構文（export や import）以外の設定になる（モジュール構文は module で指定する）  
  サポートするブラウザのバージョンに合わせて、設定する  
  ただし、webpack などのバンドルツールを利用し、Babel などのトランスパイラを挟んでいる場合は、適当に esnext とかにして、Babel 側の設定でブラウザに合わせてトランスパイルするで良いと思う  
  ブラウザのサポート状況は、<a href="https://kangax.github.io/compat-table/es6" target="_blank">ECMAScript 6 compatibility table</a>を参考  
  環境を自動でセットアップするツールを使っている場合、この設定値は変えない方がいいかも

- module  
  デフォルト値は、`target === "es3" or "es5" ? "commonjs" : "es6"`なので、target オプションに依存している  
  ただし、module はモジュール構文（export や import）のみに関係する設定になる（target はトランスパイル後のコード全体の設定になる）  
  ブラウザがモジュール構文に対応していれば es2015 以上にして、export や import 文をトランスパイル後もコードに残しておくことで、webpack などのバンドルツールで Tree Shaking を利用できる  
  Node.js で扱うモジュールに関しては CJS 互換のものが多く、モジュール構文は使えないため commonjs にしておいた方が良い（ESM 化は段々進んでいるが）  
  また、動的 import を使っている場合、es2020 以上にしないとエラーになる  
  ブラウザが es2020 をサポートしていないが、動的 import を使いたい場合は、commonjs にする（Tree Shaking は使えないが）  
  環境を自動でセットアップするツールを使っている場合、この設定値は変えない方がいいかも

- lib  
  target に含まれない機能を追加で入れたい時に指定する  
  lib を指定しない場合、target に指定したバージョンの機能はデフォルトですべて含まれている  
  ただし、lib を指定すると lib の配列で設定を上書きするので、target のバージョンも lib に含める必要がある  
  たとえば、`"lib": ["dom"]`だと`dom`のみになるので、`"lib": ["es2020", "dom"]`にして、target の`es2020`も含めておく

- allowSyntheticDefaultImports  
  true にすると CommonJS Modules のような`export default`がないモジュールからの`default import`を許可する  
  `export default`がないモジュール`example`に対して`import example from 'example'`が許可されるかどうか

  allowSyntheticDefaultImports は型チェックのみをサポートしている  
  よって、バンドルファイルの中身がこのオプションの設定によって変わることはない

- esModuleInterop  
  true にすると CommonJS Modules を ES Modules に準拠した形で import できる  
  TS をトランスパイルする際に Babel との互換性をサポートするための`__importDefault`と`__importStar`のヘルパー関数をバンドルファイルに追加する

  Babel と webpack は CommonJS Modules の`default import`を許可しているが、TS は許可していない  
  esModuleInterop を true にすることで TS でも`default import`が許可される（allowSyntheticDefaultImports を true にした場合と一緒）

  allowSyntheticDefaultImports との違いとして、esModuleInterop はトランスパイル後のバンドルファイルにヘルパー関数が追加される

  また、esModuleInterop や allowSyntheticDefaultImports のオプションが false の場合、TS では CommonJS Modules を以下の書き方で import できる  
  `const example = require('example')`  
  `import * as example from 'example'`

  ただし、`require`を使った書き方は推奨されていない  
  そして、`import * as`を使った書き方もコンパイルエラーになることがある

  esModuleInterop を true にすると、allowSyntheticDefaultImports も自動的に true となる

### 型チェック

型が正しいかチェックすること  
`tsconfig.json`の strict オプションを有効にすると型チェック関連のオプションをすべて有効にすることができる

Babel は TS を JS にトランスパイルする機能はある（バージョン 7 から）が、型チェックはサポートしていない  
また、Jest で型チェックしたい場合も`ts-jest`が必要になってくる

TS の型チェックは重く、webpack で型チェックを行うときなどは速度面で悩みのタネとなる  
よって、webpack での型チェックは廃止し、代わりに以下を用意するとよいだろう

- VS Code で型チェック
  - VS Code はインクリメンタルビルド（変更された部分だけをコンパイル）をサポートしているので、すぐに型チェックのエラーを出してくれる
- CI で型チェック
  - tsc の noEmit オプションはコンパイル結果を出力しないので、これを利用することで型チェックのみを行うことができる

### オブジェクト型

Object 型と`{}`型は同じ型  
object 型については上記 2 つと違いプリミティブ型を許可しない  
たとえば`Object.create`の型定義は`create(o: object | null): any;`となっている  
これは`Object.create(123)`や`Object.create(true)`などのプリミティブ型を許可しないことを表現している

### never 型

値を持たない型  
ボトム型を表現するために存在する  
どのような値も never 型に代入することは不可能  
また、never 型の値はどのような型にも代入可能  
よって never 型の値を実際作ることは不可能

どのような時に never 型が発生するか

- Switch 文の Case 文ですべてが網羅でき、default ケースに入る可能性がない場合に default ケースの戻り値は never 型になる
- 関数で必ず例外を Throw する場合、関数の戻り値で値を返す可能性がないため、その関数の戻り値は never 型となる

### unknown 型

どのような値も unknown 型に代入できる  
また、unknown 型の値は unknown 型か any 型のみに代入可能

unknown 型に入れた値を使うには、typeof 演算子などによる型の特定が必要  
any 型と違い、型を特定せずにそのまま使おうとするとコンパイルエラーになる  
つまり、タイプセーフな any 型

```ts
const a: unknown = 1
a.indexOf('1') // コンパイルエラー

if (typeof a === 'string') {
  // 使えるようになる
  a.indexOf('1')
}
```

### ユニオン型とインターセクション型

<a href="https://kurosame-th.hatenadiary.com/entry/2021/12/20/185937" target="_blank">TypeScript のユニオン型とインターセクション型について</a>

### タイプガード

`instanceof`や`typeof`などを使い、型を特定できれば、そのスコープ内ではその型だとみなしてキャストが不要になる  
特定スコープにおける型の保証をタイプガードと呼ぶ

```ts
function fn(x: Sample | string) {
  if (x instanceof Sample) {
    // このifスコープ内ではxをキャストせずに利用可能
    x.name
  }
}
```

### keyof

```ts
interface Example {
  name: string
  value: number
}

type K1 = keyof Example // "name" | "value"
type K2 = keyof Example[] // "length" | "push" | "pop" | "concat" | ...
```

### in

たとえば、keyof の結果に対して、要素 1 つずつに readonly を付けたい時などに使える

```ts
interface Example {
  name: string
  value: number
}

type K1 = keyof Example // "name" | "value"
type K2 = readonly [P in keyof T]: T[P] // readonly "name" | readonly "value"
```

### `as const`と`satisfies`

```ts
const a = ['a', 'b', 'c'] // 型はstring[]となる
a[0] = 'd' // 値の変更も可能

const b = ['a', 'b', 'c'] as const // 型はreadonly ['a', 'b', 'c']となる
b[0] = 'd' // 値の変更はできないためエラーになる

// 上記のas constで型が厳格になるのは、宣言後のみ
// 以下のように宣言時は自由に値を設定できる
const c = ['a', 'b', 'c', 1] as const // 型はreadonly ['a', 'b', 'c', 1]となる

// satisfiesを使うことで宣言時も型を厳格にできる
const d = ['a', 'b', 'c', 1] as const satisfies readonly string[] // 1はstringでないのでエラーになる
```

satisfies と型アノテーションの違い

```ts
type A = {
  [key in 'a' | 'b']: unknown
}

// satisfiesの場合
const l = {
  a: 'a',
  b: ['b', 'b']
} satisfies A

// bはstring[]型と推論され、以下はエラーにならない
l.b.map(v => v)

// 型アノテーションの場合
const ll: A = {
  a: 'a',
  b: ['b', 'b']
}

// bは型推論されず、unknown型のため、以下はエラーになる
ll.b.map(v => v)
```
