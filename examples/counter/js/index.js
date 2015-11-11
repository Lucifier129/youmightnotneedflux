import React, { Component, render } from 'react'
import ReactDOM from 'react-dom'
import Store from './flux'

class Counter extends Component {
	toNum(num, callback) {
		cancelAnimationFrame(this.rid)
		let { INCREMENT, DECREMENT } = this.props
		let count = () => {
			let { currentCount } = this.props
			switch (true) {
				case currentCount > num:
					DECREMENT()
					break
				case currentCount < num:
					INCREMENT()
					break
				case currentCount === num:
					return callback && callback()
			}
			this.rid = requestAnimationFrame(count)
		}
		count()
	}
	render() {
		let { INCREMENT, DECREMENT, INCREMENT_IF_ODD, currentCount } = this.props
		let getNum = e => {
			let num = parseInt(this.refs.input.value, 10)
			typeof num === 'number' && this.toNum(num)
		}
		return (
			<div id="abc">
				<span ref="efg" data-test="abaasdf">count: { currentCount }</span>
				{' '}
				<button onClick={ INCREMENT }>+</button>
				{' '}
				<button onClick={ DECREMENT }>-</button>
				{' '}
				<button onClick={ INCREMENT_IF_ODD }>incrementIfOdd</button>
				{' '}
				<input type="text" ref="input" />
				<button onClick={ getNum }>run</button>
			</div>
		)
	}
}

let methods = {
	INCREMENT() {
		this.state.currentCount += 1
	},
	DECREMENT() {
		this.state.currentCount -= 1
	},
	INCREMENT_IF_ODD() {
		let { currentCount } = this.state
		if (currentCount % 2 !== 0) {
			this.INCREMENT()
		}
	}
}

let store = new Store(methods, { currentCount: 0 })
let renderView = () => {
	ReactDOM.render(
		<Counter 
			currentCount={store.getState().currentCount}
			{...store.actions} />,
		document.getElementById('container')
	)
}

store.subscribe(renderView)
renderView()











