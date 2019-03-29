## category

words

## titles

Abstract Syntax Tree
AST
抽象構文木

## description

### JavaScript

JavaScript のコードをパースした JSON のこと  
Mozilla が提唱する ParserAPI による定義がデファクト

コードを解析・変換したい時など JavaScript からやるのは不可能に近い  
なので、JavaScript を AST にパースしてから行う  
ESLint もこの方式で静的解析を行っている

以下でパースをオンライン上で試せる  
<a href="http://esprima.org/demo/parse.html" target="_blank">Esprima</a>

### 代表的なツール

- JS から AST  
  Esprima  
  Acorn  
  Babylon（Acorn 派生）

- AST から JS（解析のみする場合は不要）  
  Escodegen  
  babel-generator
