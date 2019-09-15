## category

aws

## titles

AWS Fargate
Fargate

## description

AWS re:Invent 2017 の Keynote で発表され、2018 年 7 月 3 日に東京リージョンに対応された

従来はコンテナの実行環境として、EC2 をホストにしてプロビジョニングする必要があったが、Fargate を使うとそれが不要  
つまり、今まで EC2 とコンテナの管理を考える必要があったが、Fargate を使うとコンテナだけ考えれば良くて、スケールも Fargate がやってくれる

コンテナの中に ssh や docker exec で入ることはサポートされていない

Fargate は、Amazon ECS とシームレスに統合されている  
また、Amazon EKS でのサポートは 2018 年に開始される予定
