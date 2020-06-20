## category

language

## titles

WebAssembly
wasm

## description

ブラウザ上で動くバイナリフォーマット  
ブラウザや OS やデバイスに依存しない  
Node.js 上でも wasm は動作する  
Google, Microsoft, Mozilla を中心に開発されている  
C/C++/Rust などの言語を`.wasm`ファイルにコンパイルし、そのコードをブラウザで実行することができる  
ほとんどの場合、JavaScript より小さく、高速で動く  
（JS -> AST -> 中間表現（バイトコード）という変換が必要ないため）  
現状 JavaScript 置き換えは目指してはおらず、あくまで補完的位置づけ

### asm.js

JavaScript が動的型付けの言語（実行時に型を評価）なので、速度の面で劣る  
Mozilla 製の asm.js は JavaScript を制約にしたがって書くことで、型を明確にして AOT コンパイルできるようにする技術  
これを採用すると速度面は改善されるが、ファイルサイズが増えるという課題があった

asm.js の代替案として、wasm が登場した  
JavaScript を扱ってた asm.js と違い、wasm はバイナリコードなので容量問題を解決した

### Emscripten - エムスクリプテン

C/C++から JavaScript や asm.js に変換できるコンパイラ  
LLVM をベースにしている  
Rust は Emscripten が対応する LLVM の中間表現（IR）を生成することで Emscripten に対応している  
asm.js だけでなく、wasm を生成する機能を開発中

Rust から wasm へのビルドが開発されたっぽい  
<a href="https://github.com/rust-lang/rust/pull/42571" target="_blank">Enable wasm LLVM backend</a>

### LLVM

任意のプログラミング言語に対応可能なコンパイラ基盤  
フロントエンドとバックエンドにコンパイラが分かれている  
フロントエンドはソースコードを解析して IR に変換する  
バックエンドは IR を解析して任意のコードに変換する  
wasm に関して言えば、バックエンドの部分で IR を解析して、wasm を生成する感じ  
C/C++は clang を使って LLVM IR に変換する

Binaryen の asm2wasm を使うと、asm.js から wasm に変換できる

`.wat`,`.wast`から`.wasm`への変換  
wast は wasm をテキスト表現で記述でき、wast2wasm で変換できる

### wasm の現在の課題

- DOM に直接アクセスできない（wasm から JS を呼んでアクセスする）
- GC がない（手動でメモリ管理する）  
  wasm のコードには専用のメモリ空間が割り当てられる  
  たとえば C 言語などもその専用のメモリ空間内でメモリ操作するが、それと一緒  
  そのメモリ空間は JavaScript コードからも ArrayBuffer オブジェクトとして参照できる
- マルチスレッドに対応するという提案がある（ちなみに JS はシングルスレッド）

### AssemblyScript

TypeScript から WebAssembly に変換できる
