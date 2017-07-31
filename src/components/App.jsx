import React from 'react';
import ReactDOM from "react-dom"
import classNames from "classnames"
import ProcessBarStore from '../store/ProgressBarStore'
import Bar from './Bar'
import * as BarAction from "../actions/BarAction"

export default class App extends React.Component {

    constructor(){
        super()

        this.state = { bars: [], buttons:[], limit:100, selectedPb : 0}
    }

    componentWillMount() {
        

        ProcessBarStore.on('change', this.onBarsChanged)
    }

    onBarsChanged = (e) => {
        this.setState({ bars: ProcessBarStore.bars, buttons: ProcessBarStore.buttons, limit: ProcessBarStore.limit })
        var a = this.state.bars
    }

    clickBarProgress = (progress, bar ,e ) => {
		e.preventDefault()
        console.log('click' + progress + 'b' + bar)

        BarAction.BarOnClick({barOf : this.state.selectedPb, movement : progress})
    }


    onSelectedProgressBar = (e) => {

        e.preventDefault()

        //console.log('selected pb ' + this.refs.pbDropdownlist.value)
        this.state.selectedPb = parseInt(this.refs.pbDropdownlist.value)
    }


    render() {


      this.num = 0
      
      const pgControls = this.state.bars && this.state.bars.map(b => {
          this.num += 1
          return (
              <Bar key={'p' + this.num} pId={'p' + this.num} progressAt={b} limit={this.state.limit} clickProgress={this.clickBarProgress} />
			  
              )
      })

      const btncontrols = this.state.buttons && this.state.buttons.map(p => {
          return <button className="baralign" key={p} type="button" onClick={this.clickBarProgress.bind(this, p, this.state.selectedPb)}>{p}</button>
      })

	  this.num2 = -1
      const optcontrols = this.state.bars && this.state.bars.map(b => {
          
          this.num2 += 1
          return (<option key={'p' + b} value={this.num2} >{'progressBar' + (this.num2 + 1)}</option>)
      
      
      })
	  
	  return (
		  <div>
				<h2>Progress Bar Demo</h2>
                {this.props.children}
                {pgControls && pgControls}
                <select value={this.state.selectedPb} ref="pbDropdownlist" onChange={e => this.onSelectedProgressBar(e)}>
                    {optcontrols && optcontrols}
                </select>
                {btncontrols && btncontrols}
			  </div>
			  )

    }

} 
