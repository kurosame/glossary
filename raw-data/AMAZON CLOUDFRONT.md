## category

aws

## titles

Amazon CloudFront
CloudFront

## description

<a href="https://qiita.com/kurosame/items/4aa07679239ca8ba66e3" target="_blank">Nuxt.js で作成したアプリを CloudFront で配信する</a>

<a href="https://qiita.com/kurosame/items/675e713dac8f3c55f321" target="_blank">CloudFront Functions を TypeScript で書いて、ビルド&デプロイを CI で自動化する</a>

### 自己署名証明書について

CloudFront に自己署名証明書は使用可能  
ただし、CloudFront から通信するオリジンサーバー（API サーバーなど）が自己署名証明書を使用していた場合、CloudFront は 502 エラーを返し、TCP 接続を中断する
