
const isPlainObject = (data) => {
    return Object.prototype.toString.call(data) === '[object Object]'
}

const createStore = (reducer) => {
    if(typeof reducer !== 'function') {
        throw new Error('reducer must be an function.')
    }

    let state
    let listeners = []

    const getState = () => {
        return state
    }

    const subscribe = (listener) => {
        if(typeof listener !== 'function') {
            throw new Error('listener must be an function')
        }
        if(!listeners.includes(listener)) {
            listeners.push(listener)
        }
        return () => {
            let index = listeners.indexOf(listener)
            listeners.splice(index, 1)
        }
    }

    const dispatch = (action) => {
        if(!isPlainObject(action)) {
            throw new Error('action must be plain object.')
        }
        if(typeof action.type === 'undefined') {
            throw new Error("action must have the property 'type'")
        }
        state = reducer(state, action)
        listeners.forEach(listener => {
            listener()
        })
        return action
    }

    const randomStr = () => Math.random().toString(36).substring(7).split('').join('.')

    dispatch({
        type: '@@XRedux/INIT' + randomStr()
    })

    return {
        getState,
        subscribe,
        dispatch,
    }
}

export { 
    createStore 
}
