## category

browser

## titles

Service Worker
SW

## description

ブラウザがバックグラウンドで実行できるイベント駆動のスクリプト  
Web ページとライフサイクルも異なるし、DOM にアクセスすることもできない  
https 環境は必須  
主要イベントは Fetch, Push, Sync

例えば、以下のようなことが可能になる

- プッシュ通知  
  サーバからのプッシュ通知をを受け取り、ブラウザに表示させる

- オフライン処理  
  ブラウザを閉じてもバックグラウンド側でデータを処理したり、通信したりできる

- キャッシュ  
  ページや画像を Service Worker の CacheAPI を使って保存し、Fetch イベントハンドラで取り出す

- プロキシ  
  ブラウザから投げられたリクエストをキャッチして、加工してサーバに投げたりできる  
  また、サーバを経由せずにレスポンスを返すことも可能（エラーページを返すとか）

### ライフサイクル

1. Service Worker を登録（ブラウザでダウンロード）
1. Service Worker をインストール
1. Service Worker の更新

### Service Worker を登録

```js
navigator.serviceWorker.register('/service-worker.js')
```

スコープは Service Worker が存在する階層になる（./）  
以下のように明示的にスコープのディレクトリを設定可能  
Service Worker で制御できるのは、スコープ内の clients のみ

```js
navigator.serviceWorker.register('/service-worker.js', { scope: '/example' })
```

register 時に onupdatefound イベントが発火する

### Service Worker をインストール

Service Worker を登録後 installing 状態となる  
この時 1 回のみ oninstall イベントを発火する  
Service Worker スクリプトを変更すると、ブラウザでは別の Service Worker と見なされ、再び install イベントを発火する

以下のようにしてインストール時に処理を入れることも可能

```js
self.addEventListener('install', event => {
  console.log('V1 installing…')
})
```

### Service Worker の更新

ブラウザをコントロールしている Service Worker が存在する場合は waiting 状態へ移行（その後 active 状態へ移行する）  
存在しない場合は active 状態へ移行  
skipWaiting を呼ぶことで直ちに active 状態へ移行することもできる  
active になってから fetch や push などのイベントを受信する

```js
self.addEventListener('install', event => {
  self.skipWaiting()
})
```

また、active 状態になってもすぐにブラウザをコントロールしない  
active 状態からすぐにブラウザをコントロールしたい場合は、clients.claim を呼ぶ  
コントロールできるようになると、fetch などのイベントがスコープ内の Service Worker を通過するようになる

```js
self.addEventListener('activate', event => {
  self.clients.claim()
})
```

### Cache

- pre cache  
  Service Worker のインストール時に JavaScriput や CSS などのリソースをキャッシュ

- runtime cache  
  Fetch イベント時に HTML や画像などのリソースをキャッシュ

### Workbox

Google が中心になって開発しているライブラリ  
sw-precache と sw-toolbox の機能を含んだ発展系ライブラリ  
開発は sw-系から Workbox に移行している

### DOMChangeList

DOM の更新をひとまとめにして Service Worker で非同期に処理できるようにする

### Service Worker, Web Worker, WebSocket の違い

- Service Worker

  - メインスレッドからのネットワークリクエストをプロキシして処理できる
  - DOM にアクセス不可能

- Web Worker

  - 画面のレンダリングを大幅にブロックするような処理をマルチスレッドでバックグラウンドのスレッドで実行することができる
  - DOM にアクセス不可能

```js
// Main thread
const worker = new Worker('worker.js')

// Workerにメッセージを送信
worker.postMessage('Hello!')
// Workerからメッセージを受信
worker.onmessage = e => console.log(e.data)
```

```js
// Web worker
self.onmessage = e => {
  // Main threadからメッセージを受信
  console.log(e.data)
  // Main threadにメッセージを送信
  self.postMessage(workerResult)
}
```

- WebSocket

  - クライアントとサーバ間に単一で永続的で双方向な通信を可能にする
  - DOM にアクセス可能
