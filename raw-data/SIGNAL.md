## category

js

## titles

Signal
Signals

## description

JS の状態変化を表現するオブジェクト・概念  
Observable と似た概念  
Solid、Preact、Qwik などで採用されている

状態変化が発生すると、Signal は自動的に再評価され、その変化を反映する  
つまり、Signal は、状態変化を監視するオブジェクトとして機能する

### Signal と useState の違い

Signal は、再レンダリングのコストが抑えられる

- useSignal から返される値はリアクティブ
  - 値の更新を検知したら、それがどこで使われているか監視しているため、通知できる
  - よって、Signal はコンポーネント全体を再レンダリングする必要がなく、必要な部分だけを更新することが可能となる
- useState から返される値は非リアクティブ
  - 非リアクティブなため、値の更新が行われると（メモ化していないと）再レンダリングが行われる