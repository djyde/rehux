import { createRehux } from '../lib'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

Enzyme.configure({ adapter: new Adapter() })

describe('Rehux', () => {

  // Global state
  const initialState = {
    count: 0
  }

  // Actions
  const Actions = {
    INCR: 'INCR', DECR: 'DECR', RESET: 'RESET'
  }

  // Reducer
  const reducer = (state, action) => {
    switch (action.type) {
      case Actions.INCR:
        return { count: state.count + 1 }
      case Actions.DECR:
        return { count: state.count - 1 }
      case Actions.RESET:
        return { count: 0 }
    }
  }

  // Create Rehux
  const { Provider, useRehux } = createRehux(initialState, reducer)

  // A component for displaying `count`
  function Display() {
    const { state } = useRehux()
    return (
      <div id="count">{state.count}</div>
    )
  }

  // A component for mutating `count`
  function Toolbar() {
    const { dispatch } = useRehux()
    return (
      <div>
        <button id="incr" onClick={_ => dispatch({ type: Actions.INCR })}>Incr</button>
        <button id="reset" onClick={_ => dispatch({ type: Actions.RESET })}>Reset</button>
        <button id="decr" onClick={_ => dispatch({ type: Actions.DECR })}>Decr</button>
      </div>
    )
  }

  // Wrapped components by Provider
  function App() {
    return (
      <Provider>
        <Display />
        <Toolbar />
      </Provider>
    )
  }

  test('simulate click', () => {
    const wrapper = mount(<App />)
    expect(wrapper.find('#count').text()).toEqual('0')
    wrapper.find('#incr').simulate('click')
    wrapper.find('#incr').simulate('click')
    expect(wrapper.find('#count').text()).toEqual('2')
    wrapper.find('#decr').simulate('click')
    expect(wrapper.find('#count').text()).toEqual('1')
    wrapper.find('#reset').simulate('click')
    expect(wrapper.find('#count').text()).toEqual('0')
  })
})