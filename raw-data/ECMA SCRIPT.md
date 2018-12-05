## category

js

## titles

ECMAScript
ES

## description

Ecma International という団体によって標準化されている  
JS 以外に C#や Dart などの標準化も行っている  
Ecma International の中の Technical Committee 39（TC39）という技術委員会が中心となり、ECMAScript の仕様を議論している  
TC39 は Microsoft, Mozilla, Google, Apple といったブラウザベンダーや ECMAScript に関心がある企業などによって構成されている

### TC39

ECMAScript を策定してるグループ  
標準化されるまでに以下の 5 つのプロセスを踏む  
この stage は 2 ヶ月に 1 回ある MTG により、変動する

1. stage-0 Strawman  
   アイデア

1. stage-1 Proposal  
   提案の目的や解決方法を示す  
   Polyfill やデモを用いて解説する

1. stage-2 Draft  
   仕様に含まれる最初のバージョン、ドラフト版  
   Syntax、Semantic の正式な説明が必要

1. stage-3 Candidate  
   仕様が完成した状態  
   実装や外部のフィードバックを求める

1. stage-4 Finished  
   次のリリースで ECMAScript に取り込まれる  
   2 つ以上のブラウザに実装が組み込まれる必要がある

### ES Modules, .mjs

ES Modules の構文は決めたが、どう動かすかはホスト側（ブラウザや Node.js）に委ねられていた

- ES Modules かどうかの判別

  - ブラウザ  
    `<script type="module" src="main.js" />`のように type="module"

  - Node.js  
    .mjs という拡張子  
    .js は従来の CommonJS 扱いなので、import 構文などはシンタックスエラーになる

- CommonJS Modules との相互互換性について

  - ブラウザ  
    N/A

  - Node.js  
    制限付きで互換  
    CJS の require, module, exports は ESM では削除されているので、CJS を ESM から import すると CJS が ESM に変換された時に  
    module.exports のオブジェクトがそのまま default export となる  
    つまり以下のような書き方はエラー

    ```js
    import { foo } from './cjs'
    ```

    なので以下のようにする

    ```js
    import foo from './cjs'
    ```
