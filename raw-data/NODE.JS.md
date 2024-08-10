## category

js

## titles

Node.js

## description

Node.js は言語としての機能だけでなく、Web サーバーとしての機能も備えている  
シングルスレッドで動作する  
Node.js も Nginx と同様にイベント駆動とノンブロッキング I/O を採用している

### Node.js API

v10 から Node.js API (N-API)を正式サポート（今までは実験的実装だった）  
今まで Node.js は V8 エンジンに依存していたが、N-API として機能を切り離すことができた  
よって V8 エンジンがバージョンアップしても Node.js 側に直接的な影響は無くなる  
また、V8 以外のエンジンを選択できるようになる

### TypeScript のサポート

Node.js v22.6.0 から実験的に TypeScript のサポート機能が導入された

- `--experimental-strip-types`オプションで利用可能
- Enum やデコレーターなどサポートしていない機能もある
