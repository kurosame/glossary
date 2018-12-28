## category

aws

## titles

Amazon Web Services
AWS

## description

### CDN

CloudFront を利用する  
WAF との相性も良い

### デプロイ

CodeCommit、CodeBuild、CodeDeploy、CodePipeline などを利用する

### 耐障害性

EC2 の Auto Scaling グループや RDS の Multi-AZ 構成を利用する

### セキュリティ

IAM を使って各 AWS リソースへのアクセスを制限する

### 監視

CloudWatch を利用する  
CloudWatch は、各 AWS リソースの状況は監視できるが、プロセスや Web の監視はできない  
プロセスや Web の監視については、サードパーティツールである Mackerel、Datadog、New Relic を利用する
