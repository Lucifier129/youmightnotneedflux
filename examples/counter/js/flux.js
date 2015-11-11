export default class Store {
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