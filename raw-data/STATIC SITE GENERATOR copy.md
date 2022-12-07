## category

js

## titles

Deferred Static Generation
DSG

## description

DSG はビルド時にすべてのページを生成するのではなく、一部のページの生成をアクセスがあった際に SSR で行う

SSG はビルド時にすべてのページを生成するため、ページ数が多いとビルド時間がかかってしまう  
DSG は優先度が低い（たとえばアクセス頻度が低い）ページを遅延生成することで全体のビルドパフォーマンス改善を狙っている
