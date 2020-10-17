## category

react

## titles

Recoil

## description

Facebook 製の状態管理ライブラリー

Redux はグローバルコンテキスト的で中央集権型の状態管理  
それに対して Recoil は状態管理を局所的に行う  
Context API でも状態管理を局所的に行うことが可能だが、Context API は状態更新の際に購読しているコンポーネントが再レンダリングされて、パフォーマンス低下する可能性があったり、コンポーネントの状態がリセットされたりする問題がある  
Redux や Recoil はその辺、最適化されている

Recoil が提供するフックは React のカスタムフックに組み込みやすいように作られている
