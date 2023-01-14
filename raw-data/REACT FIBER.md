## category

react

## titles

React Fiber
react-fiber

## description

DOM を Fiber でラップすることで、React コンポーネントに対して優先順位など React 独自の概念を付与して管理できるようになる  
Fiber 自体はレンダリング工程の作業単位である

レンダリングには Render と Commit のフェーズがある

- Render フェーズ
  - stateNode を作成する（作成のみ）
    - stateNode は Fiber のプロパティで、自分と自分の子要素すべての DOM をマージしたものを保持している
  - 作業の中断・再開が可能
    - React v18 時点で作業の中断が行われるのは、startTransition か Suspense を使用した場合のみ
- Commit フェーズ
  - stateNode を使って DOM を書き換える
  - 作業の中断・再開は不可能
