## category

python

## titles

Python

## description

### `coding: UTF-8`

プログラムの先頭行で書く  
ファイルの文字コードを UTF-8 に指定している  
ただし、現在はコーディング規約上で非推奨になっている  
Python3 はデフォルト UTF-8 である（Python2 は ASCII）

### `if __name__ == "__main__":`

`__name__`は Python のグローバル変数でプログラムの実行元が格納される  
直接プログラムを呼んだ場合、`__main__`が格納される  
よって、この分岐処理はプログラムを直接呼んだ場合のみ処理を行い、外部から呼ばれた場合は何もしない
