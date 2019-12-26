## category

python

## titles

Python

## description

<a href="https://kurosame-th.hatenadiary.com/entry/2019/05/23/145431" target="_blank">Python と VSCode の快適な開発環境を考える</a>

<a href="https://qiita.com/kurosame/items/b6dbc5a7d900e6dc2b6f" target="_blank">毎朝 LINE に天気を通知するアプリを作成</a>

### `coding: UTF-8`

プログラムの先頭行で書く  
ファイルの文字コードを UTF-8 に指定している  
ただし、現在はコーディング規約上で非推奨になっている  
Python3 はデフォルト UTF-8 である（Python2 は ASCII）

### `if __name__ == "__main__":`

`__name__`は Python のグローバル変数でプログラムの実行元が格納される  
直接プログラムを呼んだ場合、`__main__`が格納される  
よって、この分岐処理はプログラムを直接呼んだ場合のみ処理を行い、外部から呼ばれた場合は何もしない
