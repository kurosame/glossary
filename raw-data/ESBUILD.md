## category

build

## titles

esbuild

## description

Go 言語で書かれた JS および TS のビルドツール  
TS から JS へのトランスパイル、バンドル、ミニファイ、JSX/TSX をサポート

かなり速い  
ベンチマークによると webpack、Parcel、Rollup と比べてもだいぶ速い

速い理由としては

- Go 言語で書かれている
- パースやソースマップ生成などの重い処理が並列化されている
- コードが色々最適化されている

Vite は TS から JS へのトランスパイルに esbuild を採用している
