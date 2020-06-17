## category

js

## titles

TypeScript

## description

JavaScript のスーパーセット  
コンパイル時に静的型検査を行う  
tsc コマンドでコンパイルすると JavaScript に変換できる

<a href="https://qiita.com/kurosame/items/3c28f45c8b2e65f5c69d" target="_blank">JS から TS への移行で悩んだ点の対応メモ</a>

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
