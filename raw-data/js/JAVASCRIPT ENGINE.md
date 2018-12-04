## category

js

## titles

JavaScript Engine
Chakra
JavaScriptCore
SpiderMonkey
V8

## description

### V8

Google が開発する C++で書かれた OSS の JIT 型 JavaScript 実行エンジン  
Google Chrome, Android Browser, Node.js に搭載されている  
ランタイム実行時に JavaScript を機械語にコンパイラする  
途中でバイトコードや中間言語への変換は無い

- ソースコードのパース  
  ソースコードを AST にパースする  
  V8 は生成した AST を 1〜4byte のバイトコードにコンパイルして実行する

  - Pre-parsing  
    事前に全ての関数をパースしておく

  - Lazy-parsing  
    実際に呼び出されるまでパースを遅延する  
    呼び出された際にパースする

### JavaScript Engine の実行結果を確認したい

```sh
$ yarn global add eshost-cli jsvu
$ set -x PATH $HOME/.jsvu $PATH
```

jsvu で主要な JS Engine をまとめてインストールできる

```sh
$ jsvu
```

以下がまとめてインストールされる  
Chakra/ChakraCore - Edge  
JavaScriptCore - Safari  
SpiderMonkey - Firefox  
V8 - Chrome, Node.js  
XS - Moddable SDK

各 JS Engine を eshost に登録

```sh
$ eshost --add 'Chakra' ch ~/.jsvu/chakra
$ eshost --add 'JavaScriptCore' jsc ~/.jsvu/javascriptcore
$ eshost --add 'SpiderMonkey' jsshell ~/.jsvu/spidermonkey
$ eshost --add 'V8' d8 ~/.jsvu/v8
$ eshost --list
```

各 JS Engine の実行結果を見る

```sh
$ eshost -e 'Map.length'
```
