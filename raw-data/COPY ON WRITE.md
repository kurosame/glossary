## category

other

## titles

Copy on Write
CoW

## description

書き込み時にコピーする

```swift
var a = [1, 2, 3]
var b = a
print(a) // 1, 2, 3
print(b) // 1, 2, 3
a.append(4)
print(a) // 1, 2, 3, 4
print(b) // 1, 2, 3
a.append(5)
print(a) // 1, 2, 3, 4, 5
print(b) // 1, 2, 3
```

b に a を代入した時点で、b は a のデータ領域を共有する  
a のデータ領域をコピーして、b のデータ領域を新しく作るわけではない  
a に append（書き込み処理）が入った場合、データ領域の共有が解除され、b 用のデータ領域がコピーされる  
これを Copy on Write という  
再び a に append した場合には、既に共有しているデータ領域がないので、データ領域のコピーは行われない
