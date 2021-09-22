## category

aws

## titles

Amazon Elastic IP
Elastic IP

## description

EC2 インスタンスや Fargate は Public サブネットで PublicIP を保持することができるが、インスタンスを再起動すると、毎回 IP が変わってしまう  
Elastic IP をアタッチすることで変化しない静的な IP アドレスを保持することができる

Elastic IP はちゃんとインスタンスに割り当てていれば、課金されることは基本的にない  
以下の条件に当てはまる場合のみ課金される

- Elastic IP アドレスがインスタンスにアタッチされていない（発行のみ行った状態）
- Elastic IP アドレスをアタッチしたインスタンスが停止している
- 複数の Elastic IP アドレスを 1 つのインスタンスに割り当てている
