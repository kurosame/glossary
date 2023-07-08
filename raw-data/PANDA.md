## category

css

## titles

Panda

## description

CSS in JS フレームワーク  
Chakra UI と開発元が同じ

- ゼロランタイム
- ほとんどすべての JS フレームワークをサポートしている

### ゼロランタイム CSS in JS

ランタイム CSS in JS は、コンポーネントのレンダリング時に CSS を解析する  
ゼロランタイム CSS in JS は、ビルド時に CSS を解析し、`.css`ファイルを生成する  
その`.css`ファイルをランタイム時にブラウザが読み込む（従来の）やり方

どちらもスタイルを書くときの構文は CSS in JS 形式で書く

- ランタイム CSS in JS
  - ランタイム時のパフォーマンスが悪い
  - Emotion や styled-components など
- ゼロランタイム CSS in JS
  - ランタイム時のパフォーマンスが良い
  - Panda や Stitches など
