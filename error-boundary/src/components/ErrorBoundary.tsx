import React, { Component } from 'react'

type Props = {
  children: React.ReactNode
}

type State = {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false
    }
  }

  static getDerivedStateFromError(error: Error) {
    console.error(error)
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error(error, errorInfo)
  }

  render() {
    if(this.state.hasError) {
      return (
        <div style={{background: 'red'}}>
          Something went wrong
        </div>
      )
    }

    return (
      this.props.children
    )
  }
}