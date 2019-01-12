## category

browser

## titles

Foreign Fetch

## description

3rd Party のサービスが自分のサービス上にある画像等のサブリソースを  
Service Worker の Foreign Fetch で取得することができるようになる

通常の Fetch は自分のサービス上からのリクエストを Service Worker で処理するのに対して、  
Foreign Fetch は 3rd Party からのリクエストも Service Worker で処理できるようになる

でも Service Worker から削除された（Double-Keying の影響を考えてとのこと）  
<a href="https://github.com/w3c/ServiceWorker/issues/1188" target="_blank">Remove foreign fetch</a>

### Double-Keying

Cookie を例にすると「どこから付与されたか」や「どのページを見ているか」のように 2 つの情報をキーとして持たせることができる  
このようなものを Double-Keying と言う

ServiceWorker が Double-Keying されていると本サイトが取得したコンテンツとサブサイトが取得したコンテンツが同じコンテンツであっても別領域に保存されてしまう  
上の例によると「どこから付与されたか」というキーだけであれば、本サイトもサブサイトも取得先が同じという情報しかないため、同じ領域に保存できる  
ただし、「どのページを見ているか」というキーが加われば、本サイトのサブリソースがサブサイトに送信されることは無いため、同じコンテンツであっても別領域に保存することになる
