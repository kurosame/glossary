## category

package-manager

## titles

pnpm

## description

npm や Yarn と同等以上に高速  
ロックファイル（pnpm-lock.yaml）も作られる

npm や Yarn とパッケージのインストール方法が根本的に異なる  
たとえば以下の 2 つのパッケージをインストールした場合、`node_modules`配下には react と vue のシンボリックリンクのみが配置される  
実体は、`node_modules/.pnpm`配下にインストールされている  
2 つのパッケージ間で重複した依存パッケージがあった場合、重複は排除され、実体が重複することなくインストールされる  
この場合、2 つのパッケージそれぞれにこの重複パッケージのシンボリックリンクが作られる  
よって、`node_modules`のサイズは削減される

```sh
npx pnpm add react
npx pnpm add vue
```
