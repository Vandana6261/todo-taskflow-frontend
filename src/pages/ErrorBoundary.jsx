
class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            errorInfo: null
        }
    }

    componentDidCatch(error, info) {
        this.setState({
            error: error,
            errorInfo: info
        })
    }

    render() { 
        if(this.state.errorInfo) {
            return (
                <div>
                    <h2>Something went wrong</h2>
                </div>
            )
        }
        return this.props.children;
    }
}
 
export default ErrorBoundary;