import React from 'react';
import ReactDOM from "react-dom"
import ProcessBarStore from '../store/ProgressBarStore'

export default class Bar extends React.Component {

    constructor(){
        super()
        
    }

    componentWillMount() {
        

        //ProcessBarStore.on('change', this.onBarsChanged)
    }

    onBarsChanged = () => {
        
    }

    
    render() {	

        let maxLimit = this.props.limit && this.props.limit > 0 ? this.props.limit : 100
        let applyStyle = this.props.progressAt > maxLimit ? "barStatusOver" : "barStatus"
        let calcWidth = (this.props.progressAt/maxLimit ) * 100
        let adjustedWidth = 100
        let displayWidth = 100 + '%'
        

        if (this.props.progressAt < 0) {
            adjustedWidth = 0
            displayWidth = ''

        }
        else if (this.props.progressAt > 100) {
            adjustedWidth = this.props.progressAt > 100 ? 100 : calcWidth
            displayWidth = this.props.progressAt + '%'

        } else {
            adjustedWidth = this.props.progressAt
            displayWidth = this.props.progressAt + '%'

        }

        const pStyle = { width: adjustedWidth + '%'}

        return (
            <div className="progressBar">
                <div key={this.props.pId} className={applyStyle} style={pStyle}>{displayWidth}</div>
            </div>
			)

    }

}
