## category

other

## titles

Singleton
シングルトン

## description

そのクラスのインスタンスが絶対に 1 つである事を保証する、1 つ分のメモリだけ確保する  
インスタンス生成の呼出しを複数回行っても、全て同じインスタンスを返す  
JavaScript はクラスは無いので、新しくオブジェクトを作ればシングルトンになる

```swift
class Singleton {
    static let shared = Singleton()
    private init() {}
    var value = "aaaa"
}

class NotSingleton {
    static let shared = NotSingleton()
    private init() {}
    var value = "aaaa"
}

// Singleton
let singleton = Singleton.shared
var sample1 = singleton
print(singleton.value) // aaaa
print(sample1.value)   // aaaa

sample.value = "bbbb"
print(singleton.value) // bbbb
print(sample1.value)   // bbbb

// Not Singleton
let notSingleton = NotSingleton.shared
var sample2 = notSingleton

sample2.value = "bbbb" // インスタンスがコピーされる
print(singleton.value) // aaaa
print(sample1.value)   // bbbb
```
