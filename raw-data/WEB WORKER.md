## category

browser

## titles

Web Worker

## description

画面のレンダリングを大幅にブロックするような処理をマルチスレッドでバックグラウンドのスレッドで実行することができる  
DOM にはアクセス不可能

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

### WorkerDOM

Web Worker から DOM を利用できるようになる  
現在（2018/12/26）は α 版
