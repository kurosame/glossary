## category

mobile

## titles

Accelerated Mobile Pages
AMP

## description

モバイルページを高速に表示させるための手法  
ブラウザにレンダリングする過程で描画が遅くなる要素を排除したもの  
Google と Twitter が協同し、オープンソースプロジェクトとして立ち上げた  
AMP の仕様にしたがって作成されたページは Google や Twitter 側でキャッシュされる  
AMP HTML, AMP JS, AMP CDN の 3 つの要素から構成されている

### AMP HTML

img タグを amp-img タグに変更など特定のタグを AMP の仕様に沿って実装する必要がある  
その他も色々ルールに沿って実装する必要がある

例）amp-img, amp-video  
通常の img タグや video タグは使えない、これらを amp-img, amp-video に移行するだけで  
画像や動画が遅延表示され、画面に表示されない間はダウンロードが行われない

### AMP JS

AMP HTML で記述された HTML を非同期にレンダリングする JavaScript  
AMP は AMP JS 以外の JavaScript を許容しないので、他の JavaScript を読み込ませることはできない

### AMP CDN

AMP ページをキャッシュして、配信する
