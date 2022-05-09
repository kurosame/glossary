## category

react

## titles

Redux Thunk
redux-thunk

## description

Action Creator でオブジェクトだけでなく関数も返せるようになる

通常 reducer は Action Creator の戻り値である Action オブジェクト（action）を受け取る  
ただし、非同期処理では Action オブジェクトを戻り値として返すことができない

thunk に渡す関数は dispatch だけでなく、第 2 引数に getState を渡すことができる  
dispatch する時のパラメーターに Action オブジェクトだけでなく、関数も受け取れるようにしている
