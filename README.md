# Rehux

![](./assets/logo.png)

[![](https://badgen.net/npm/v/rehux)](https://npm.im/rehux)
[![CircleCI](https://circleci.com/gh/djyde/rehux/tree/master.svg?style=shield)](https://circleci.com/gh/djyde/rehux/tree/master)
[![install size](https://packagephobia.now.sh/badge?p=rehux)](https://packagephobia.now.sh/result?p=rehux)

## Introduction

Yet another React state container like Redux, but based on React Hooks API.

## Install

```
npm i rehux --save
```

## Usage

Here is just an example for showing how Rehux looks like. If your application is as simple as this, you might not need state management tool. Local state or local `useReducer` is fine.

**Prepare the state and reducer**:

```tsx
// Global state
const initialState = {
  count: 0
}

// Actions
enum Actions {
  INCR, DECR, RESET
}

// Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case Actions.INCR:
      return { count: count + 1 }
    case Actions.DECR:
      return { count: count - 1 }
    case Actions.RESET:
      return { count: 0 }
  }
}
```

**Using Rehux**:

```tsx
import { createRehux } from 'rehux'

// Create Rehux
const { Provider, useRehux } = createRehux(initialState, reducer)

// A component for displaying `count`
function Display () {
  const { state } = useRehux()
  return (
    <div>{state.count}</div>
  )
}

// A component for mutating `count`
function Toolbar () {
  const { dispatch } = useRehux()
  return (
    <div>
      <button onClick={_ => dispatch({ type: Actions.INCR })}>Incr</button>
      <button onClick={_ => dispatch({ type: Actions.RESET })}>Reset</button>
      <button onClick={_ => dispatch({ type: Actions.DECR })}>Decr</button>
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

render(<App />, document.body)
```

## APIs

### createRehux(initialState, reducer): { Provider, useRehux }

#### Provider

A context provider component which should be put on top of all your components

#### useRehux(): { state, dispatch }

A React hook return the state and the dispatch method.

# License

MIT License
