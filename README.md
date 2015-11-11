# youmightnotneedflux
you might not need flux/redux

## It is hard to choice the flux library

There are too many flux library.

## flux in 30 lines

The flux store can be a class.

The action function is a store method which has bound `this`, so that you can pass action everywhere and call it without error.

```javascript
class Store {
	constructor(props = {}, initialState = {}) {
		this.state = initialState
		this.actions = {}
		this.listeners = []
		Object.assign(this, props)
		for (let key in this) {
			if (typeof this[key] === 'function') {
				this.actions[key] = (...args) => {
					this[key](...args)
					this.listeners.forEach(listener => listener(key, ...args))
				}
			}
		}
	}
	getState() {
		return this.state
	}
	replaceState(nextState) {
		this.state = nextState
	}
	subscribe(listener) {
		this.listeners.push(listener)
		return () => {
			let index = this.listeners.indexOf(listener)
			if (index >= 0) {
				this.listeners.splice(index, 1)
			}
		}
	}
}
```

## how to write custom action?

just pass props param to `new Store`.

```javascript
var props = {
	ADD_ITEM: function(item) {
		this.state.list.push(item)
	},
	DELETE_ITEM: function(item) {
		let index = this.state.list.indexOf(item)
		if (index !== -1) this.state.list.splace(index, 1)	
	}
}
var store = new Store(props, { list: [] })
var { ADD_ITEM, DELETE_ITEM } = store.actions
var item = { a: 1}
ADD_ITEM(item)
store.getState() // { list: [{ a: 1 }]}
DELETE_ITEM(item)
store.getState() // { list: []}
```

## how to write middleware ?

just inherit Store like below:

```javascript
let logger = Store => {
	let log = (actionType, actionHandler) => (...args) => {
		console.log(`action ${ actionType } invoke by [${ args }]`)
		console.time(actionType)
		actionHandler(...args)
		console.timeEnd(actionType)
	}
	return class StoreWithLogger extends Store {
		constructor(props, initialState) {
			super(props, initialState)
			this.actions = this.actions.map(log)
		}
	}
}
```

## TODO...