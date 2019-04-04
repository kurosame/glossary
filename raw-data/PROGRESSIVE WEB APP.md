## category

mobile

## titles

Progressive Web App
PWA

## description

モバイルページでネイティブアプリのような挙動をさせることが出来る  
Google が中心となって策定している  
AMP と違い特定のフレームワーク等はなく、Service Worker などの技術を使って実現する  
IE 以外で PWA 対応の動きがある

以下の Google が策定したチェックリストに沿っていれば、そのページは PWA と言える  
<a href="https://developers.google.com/web/progressive-web-apps/checklist" target="_blank">Progressive Web App Checklist</a>

### メリット

- ページの読み込みや表示が速い
- オフラインで動く
- プッシュ通知の受信が可能
- インストール不要
- iOS アプリのような審査が無く、アップデートできる
- GPS が使える
- ネイティブアプリのようにデフォルトの UI（ブラウザのメニューバーなど）を削除したりできる
- ホームにページを追加でき、インストールする必要なくアプリのように起動できる
- ホームにアイコンが設定できる
- 起動時のスプラッシュ画面が設定できる

### PRPL - Push Render Pre-cache Lazy-load

Google が提唱する PWA の開発パターン  
Web Components, Service Worker, HTTP/2, Server Push の技術を活用している

### AppShell モデル

PWA を構築する手段の 1 つ  
HTML/CSS/JavaScript をオフラインで使用できるようにキャッシュしておく  
アクセス時に毎回全てのコンテンツが読み込まれるのではなく、必要なコンテンツのみ読み込む為、高いパフォーマンスが期待できる

### AMP and PWA

- AMP as PWA  
  Standalone AMP（単独で動作する AMP）  
  PC/モバイル向けサイトとは別に AMP サイトを作成・別 URL で公開するのが一般的だが、  
  AMP as PWA ではサイトを分けずに AMP サイト単体で運用し、PWA を構築する

- AMP to PWA  
  最初のページは AMP サイトにユーザを着地させ、高速なパフォーマンスを実現する  
  ブラウザのバックエンド側で Service Worker を動作させ、次ページ移動後に PWA の機能を提供する  
  amp-serviceworker というタグで AMP サイトを起点にして ServiceWorker をインストールさせることができる

- AMP in PWA  
  サイトは PWA で構築し、コンテンツをもたない  
  AMP コンテンツを外部から読み込む  
  この手法は ShadowReader と呼ばれる  
  技術的には AppShell で実現する
