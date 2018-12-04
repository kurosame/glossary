## category

swift

## titles

Swift

## description

### DesignPattern

- MVC  
  V:UIView  
  C:UIViewController  
  Swift の特性上、これら２つは密すぎるので、分離するのは難しいのではないか

- MVVM  
  V:UIView, UIViewController  
  VM:VIewModel  
  相性は良さそう  
  採用した経験はあるが、その時は UIViewController が肥大化してしまった

- Flux  
  ReSwift（Redux ライクな FW） + RxSwift  
  こちらの構成で１回書いてみたい

### Protocol

クラスに実装させたいクラスや構造体を定義させることができる  
他言語でいうインターフェースのこと  
プロトコルが書かれたクラスを継承したサブクラスはこのプロトコルを必ず実装する必要がある

```swift
protocol SampleProtocol: class {
    func counter(count: Int)
}
```

### R.swift

画像名などリソースにアクセスする際に、文字列によるハードコーディングを防ぎ、プロパティ・メソッド経由でリソースにアクセスできるようになる  
これにより Xcode のコード補完もかかるようになる  
`R.generated.swift`というファイルが自動的に作られ、依存関係がマッピングされている
