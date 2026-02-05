"use client"

import React, { Component, ReactNode } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import { Button } from './ui/button'

interface Props {
    children: ReactNode
    fallback?: ReactNode
}

interface State {
    hasError: boolean
    error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error: Error): State {
        return {
            hasError: true,
            error
        }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('Error caught by boundary:', error, errorInfo)
    }

    handleReset = () => {
        this.setState({ hasError: false, error: undefined })
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback
            }

            return (
                <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
                    <div className="mb-6 rounded-full bg-destructive/10 p-4">
                        <AlertTriangle className="h-12 w-12 text-destructive" />
                    </div>
                    <h2 className="mb-2 text-2xl font-bold">Something went wrong</h2>
                    <p className="mb-6 text-muted-foreground max-w-md">
                        {this.state.error?.message || 'An unexpected error occurred. Please try refreshing the page.'}
                    </p>
                    <div className="flex gap-3">
                        <Button onClick={this.handleReset} variant="outline">
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Try Again
                        </Button>
                        <Button onClick={() => window.location.reload()}>
                            Reload Page
                        </Button>
                    </div>
                    {process.env.NODE_ENV === 'development' && this.state.error && (
                        <details className="mt-6 max-w-2xl text-left">
                            <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                                Error Details (Development Only)
                            </summary>
                            <pre className="mt-2 overflow-auto rounded-lg bg-secondary p-4 text-xs">
                                {this.state.error.stack}
                            </pre>
                        </details>
                    )}
                </div>
            )
        }

        return this.props.children
    }
}
