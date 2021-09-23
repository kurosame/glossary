## category

aws

## titles

AWS Direct Connect

## description

AWS が提供する専用回線で、ユーザーのネットワーク環境から AWS までをインターネットを経由せずプライベートに接続できる

ユーザーから直接 AWS に Direct Connect で接続できるわけではない  
`ユーザー -> Direct Connect Location -> AWS`という感じに Direct Connect Location を経由して間接的に AWS に接続している  
Direct Connect は`Direct Connect Location -> AWS`間の接続のみをサポートしている  
よって、ユーザーから Location までの接続は自前で用意（Location のキャリアとの契約）する必要がある
