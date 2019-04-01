## category

architecture

## titles

Command Query Responsibility Segregation
CQRS
コマンドクエリ責務分離

## description

コマンド（更新系・副作用有）とクエリ（参照系・副作用無）でサーバを分割すること

### コマンド

複雑なビジネスロジックが多く、ドメイン駆動に向いている  
速度は優先度下げて良い

### クエリ

ドメイン層はほとんど必要ないケースが多い  
速度が最優先
