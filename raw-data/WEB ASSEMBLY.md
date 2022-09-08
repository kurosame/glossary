## category

language

## titles

WebAssembly
WASM
WASI

## description

ブラウザ上で動くバイナリフォーマット  
ブラウザや OS やデバイスに依存しない  
Node.js 上でも WASM は動作する  
Google, Microsoft, Mozilla を中心に開発されている  
C/C++/Rust などの言語を`.wasm`ファイルにコンパイルし、そのコードをブラウザで実行することができる  
ほとんどの場合、JavaScript より小さく、高速で動く  
（JS -> AST -> 中間表現（バイトコード）という変換が必要ないため）  
現状 JavaScript 置き換えは目指してはおらず、あくまで補完的位置づけ

### asm.js

JavaScript が動的型付けの言語（実行時に型を評価）なので、速度の面で劣る  
Mozilla 製の asm.js は JavaScript を制約にしたがって書くことで、型を明確にして AOT コンパイルできるようにする技術  
これを採用すると速度面は改善されるが、ファイルサイズが増えるという課題があった

asm.js の代替案として、WASM が登場した  
JavaScript を扱ってた asm.js と違い、WASM はバイナリコードなので容量問題を解決した

### Emscripten - エムスクリプテン

C/C++から JavaScript や asm.js に変換できるコンパイラ  
LLVM をベースにしている  
Rust は Emscripten が対応する LLVM の中間表現（IR）を生成することで Emscripten に対応している  
asm.js だけでなく、WASM を生成する機能を開発中

Rust から WASM へのビルドが開発されたっぽい  
<a href="https://github.com/rust-lang/rust/pull/42571" target="_blank">Enable wasm LLVM backend</a>

### LLVM

任意のプログラミング言語に対応可能なコンパイラ基盤  
フロントエンドとバックエンドにコンパイラが分かれている  
フロントエンドはソースコードを解析して IR に変換する  
バックエンドは IR を解析して任意のコードに変換する  
WASM に関して言えば、バックエンドの部分で IR を解析して、WASM を生成する感じ  
C/C++は clang を使って LLVM IR に変換する

Binaryen の asm2wasm を使うと、asm.js から WASM に変換できる

`.wat`,`.wast`から`.wasm`への変換  
wast は WASM をテキスト表現で記述でき、wast2wasm で変換できる

### WASM の現在の課題

- DOM に直接アクセスできない（WASM から JS を呼んでアクセスする）
- GC がない（手動でメモリ管理する）  
  WASM のコードには専用のメモリ空間が割り当てられる  
  たとえば C 言語などもその専用のメモリ空間内でメモリ操作するが、それと一緒  
  そのメモリ空間は JavaScript コードからも ArrayBuffer オブジェクトとして参照できる
- マルチスレッドに対応するという提案がある（ちなみに JS はシングルスレッド）

### AssemblyScript

TypeScript から WebAssembly に変換できる

### WASI（WebAssembly System Interface）

WebAssembly をブラウザ以外の環境で動かすための業界標準仕様のシステムインターフェイス  
WASM アプリケーションから OS のファイルシステムなどにアクセスが発生すると、OS 依存の API をコールする必要がある  
WASI は OS の API へのアクセスを抽象化し、OS 非依存のアプリケーションが実装可能になる

各 WASM ランタイムの WASI 対応が完了していれば、プラットフォームに依存しないポータブルな WASM バイナリを作成することできる  
WASM ランタイムは Wasmer、Wasmtime、WasmEdge などがある
