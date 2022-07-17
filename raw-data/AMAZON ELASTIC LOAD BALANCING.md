## category

aws

## titles

Amazon Elastic Load Balancing
ELB
Application Load Balancer
ALB
Network Load Balancer
NLB

## description

### ELB（NLB）を SSL/TLS 対応

オリジンサーバー（NLB）が自己署名証明書の場合、CloudFront が 502 を返すので、ACM で発行した証明書を使う

1. ドメインを取得
   - ドメインを取得済みなら、そのサブドメインでも良い
1. ACM から`*.example.com`でパブリック証明書を発行
   - 検証方法は DNS の検証にする
   - DNS 検証にすることで、CNAME レコードを登録しておくだけで、ACM の更新を自動で行ってくれる
     - メール検証の場合は有効期限（ACM は 13 か月）が来るたびに対応が必要
1. ACM の管理画面から CNAME 名と CNAME 値が割り振られるので、これを利用している DNS サーバーで CNAME レコードとして登録する
   - しばらく待つと、ACM で証明書のステータスが発行済みになる
1. DNS サーバーに A レコードを追加し、ELB のドメインを証明書のドメインにエイリアスする
   - 証明書のドメインと ELB のドメインが異なると、ブラウザは`ERR_CERT_COMMON_NAME_INVALID`というエラーを返すため
