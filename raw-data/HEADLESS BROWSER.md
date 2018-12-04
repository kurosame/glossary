## category

browser

## titles

Headless Browser
ヘッドレスブラウザ

## description

GUI のないブラウザ  
CLI や API などから操作できるため、テストや画面キャプチャに使う

### PhantomJS

レンダリングエンジンに WebKit を使っている
WebKit とは Apple が中心となって開発しているブラウザ用のレンダリングエンジン
現在、開発は終了し、GitHub リポジトリもアーカイブされている

### NightmareJS

Electron で作られている  
レンダリングエンジンに Blink を使っている  
Blink は Google が中心となって開発しており、WebKit をフォークして作られた  
WebKit の開発方針で Apple と Google が揉めたためこうなった

### Puppeteer パペティアー

Chrome を Node.js から操作するライブラリ  
Chrome の DevTool 開発チームがメンテナンスしている  
Chrome 59 で headless モードが利用可能になって以降、Headless Chrome を直接操作するライブラリがいくつか出ている（chromy など）がその中の 1 つ  
レイヤー的には上記の PhantomJS や NightmareJS と一緒と言えると思う  
ただし、NightmareJS のように Electron を介さなくても、Headless Chrome であれば直接操作できる
