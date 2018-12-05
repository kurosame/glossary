## category

js

## titles

EventEmitter
EventTarget

## description

### EventEmitter

Node.js のイベント駆動型プログラミングを可能とする機能（events.EventEmitter）  
emit でイベントを発火して、on で受け取る

Vue.js などにも移植されている  
⇒vm.$on、vm.$emit

### EventTarget

EventEmitter の代替となるかも  
ただし、EventEmitter の方が多機能  
EventTarget は DOM の仕様（whatwg/dom）でマージされた  
つまり、EventEmitter のブラウザ移植が不要になることが期待される
