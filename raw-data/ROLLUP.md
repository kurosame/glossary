## category

build

## titles

Rollup

## description

モジュールバンドラー  
React、Vue.js、Ember.js などに Rollup が使われている

webpack や Browserify などの他のバンドラーは ES5 に変換しているが、  
Rollup はいったん ES6 に変換し、必要に応じて babel 等で ES5 に変換する

npm レジストリに公開されている ES5 モジュール（CommonJS）は Rollup で読み込めない為、  
プラグインで ES6 に変換して読み込ませる必要がある  
なお、npm に公開されている最近のモジュールは ES6 で書かれているものがほとんどだと思う

ES6 にするメリットとして、CommonJS.require だとライブラリ全体をインストールするが、ES6 の import を使えばライブラリの必要な機能のみインストールすることが可能  
また、1 度も import されていない関数・クラス・変数をコンパイルの段階で除去できる（Tree Shaking）  
つまり、バンドル後の JS のファイルサイズが軽くなる

※webpack2 でも Tree Shaking が実装された  
babel-preset-es2015 を使っている場合、{"modules": false}を書いておき、バンドル前に ES を CommonJS に変換するのを防ぐ

アプリケーションは webpack、ライブラリは Rollup という使い方が良いみたい

Rollup は HMR に対応していない  
また、複数バンドルを作成する際にコード分割をサポートしていない
