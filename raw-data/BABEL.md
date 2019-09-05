## category

js

## titles

BABEL

## description

JS の文法の変換や Polyfill の提供を行う

### 変換の流れ

1. `@babel/parser`  
   ソースコードを AST に変換
1. `@babel/[Babel Plugin]`  
   AST を探索し、ノードを追加・更新・削除する
1. `@babel/generator`  
   AST をソースコードに変換
