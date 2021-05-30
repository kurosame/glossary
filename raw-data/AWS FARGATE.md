## category

aws

## titles

AWS Fargate
Fargate

## description

AWS re:Invent 2017 の Keynote で発表され、2018 年 7 月 3 日に東京リージョンで使えるようになった

従来はコンテナーの実行環境として、EC2 をホストにしてプロビジョニングする必要があったが、Fargate を使うとそれが不要  
つまり、今まで EC2 とコンテナーの管理を考える必要があったが、Fargate を使うとコンテナーだけ考えれば良くて、スケールも Fargate がやってくれる

コンテナーの中に ssh や docker exec で入ることはサポートされていない

Fargate は、Amazon ECS とシームレスに統合されている  
また、Amazon EKS でのサポートは 2018 年に開始される予定

<a href="https://kurosame-th.hatenadiary.com/entry/2021/05/06/173256" target="_blank">ECS Fargate に exec する</a>
