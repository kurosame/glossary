## category

browser

## titles

Shim

## description

### Node.js

Node.js にバンドルされているモジュール（Node.js コアモジュール）は、Node.js 向けに作られている為、そのままブラウザで動かすことは難しい  
webpack や browserify などのバンドラーは Node.js コアモジュールをブラウザ向けに代替モジュールとして作り変える  
この代替モジュールをブラウザ向け Shim ライブラリという

### Kubernetes

Kubernetes と Docker でコンテナーがサポートしている API の規格は異なる  
Kubernetes で標準化された API である CRI（Container Runtime Interface）を Docker は対応していない  
よって、Kubernetes と Docker は Dockershim というブリッジを介してやりとりしている

ただし、Kubernetes で Dockershim を使うのは非推奨になった
