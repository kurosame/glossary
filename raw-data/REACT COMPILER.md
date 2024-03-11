## category

react

## titles

React Compiler
React Forget

## description

メモ化（useMemo、useCallback、memo）を明示的に実装する必要なく、レンダリングを抑制する処理を自動で行ってくれる  
元々 React Forget と呼ばれていた機能

最適化されるためには、いくつかルールがある  
ルールを満たしていないコンポーネントは最適化をスキップされる

- コンポーネントが冪等性を満たしていること
  - 同じ props を受け取ったら、毎回同じレンダリング結果を返すこと
- props や state がイミュータブルであること
  - props や state を直接書き換えていないこと
