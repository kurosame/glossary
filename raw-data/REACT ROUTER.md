## category

react

## titles

React Router
react-router

## description

### history

react-router v4 系の話  
`react-router-dom`内の BrowserRouter で history が作成されている  
BrowserRouter から Route へは`this.context.router`内の history を props に詰めて渡している

```js
// react-router.Route.render()の一部だけを抜粋
const { children, component, render } = this.props
const { history, route, staticContext } = this.context.router // contextからhistoryを取得
const props = { match, location, history, staticContext } // propsにhistoryを詰める

// Routeを作成し、propsを渡す
React.createElement(component, props)
```
