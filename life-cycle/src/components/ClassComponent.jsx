import React, { Component } from 'react'

export default class ClassComponent extends Component {
    
    constructor() {
        super()
        console.log('ClassComponent constructor')
        this.state = {
            count: 0
        }
    }

    componentDidMount() {
        console.log('ClassComponent did mount')
    }

    componentDidUpdate() {
        console.log('ClassComponent did update')
    }

    componentWillUnmount() {
        console.log('ClassComponent will unmount')
    }

    setCount(value) {
        this.setState({ count: value })
    }

    render() {
        return (
            <>
                <div>ClassComponent</div>
                <button onClick={() => this.setCount(this.state.count + 1)}>Button</button>
            </>

        )
    }
}
