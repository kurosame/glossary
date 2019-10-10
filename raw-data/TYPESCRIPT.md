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

### オブジェクト型

Object 型と`{}`型は同じ型  
object 型は上記 2 つと違いプリミティブ型を許可しない  
例えば`Object.create`の型定義は`create(o: object | null): any;`となっている  
これは`Object.create(123)`や`Object.create(true)`などのプリミティブ型を許可しないことを表現している

### never 型

どのような値も never 型に代入することは不可能  
また、never 型の値はどのような型にも代入可能  
よって never 型の値を実際作ることは不可能

どのような時に never 型が発生するか

- Switch 文で Case 文で全てが網羅でき、default ケースに入る可能性が無い場合に default ケースの戻り値は never 型になる
- 関数でエラーを Throw している場合で、関数の戻り値で値を返す可能性が無い場合にその関数の戻り値は never 型となる

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
