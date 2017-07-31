import React from "react"
import {EventEmitter} from "events"
import dispatcher from "../actions/dispatcher"
import 'es6-shim'
//import * as BetUIAction from "../actions/BetActions"

class ProgressBarStore extends EventEmitter {

    constructor(){
        super()
        this.progressBarArea = this.progressBarArea.bind(this)
        dispatcher.register(this.actionHandler)
        this.getDataAPI()
        this.bars = []
        this.button = []
        this.limit = 100
		
    }

    callback = (request) =>
    {
        if (request.target.status === 200)
        {
            let config = JSON.parse(request.target.response)
            this.bars = config.bars
            this.buttons = config.buttons
            this.limit = config.limit

			this.emit('change')
        }
        //console.log(request.responseText)
    }

    getDataAPI = () => {

        var httpInvoke = new XMLHttpRequest();
        var url = 'http://pb-api.herokuapp.com/bars'

        if (httpInvoke) {
            httpInvoke.open('GET', url, true);
            httpInvoke.setRequestHeader("Content-type", "application/json");
            httpInvoke.onreadystatechange = this.callback
     //           (e) => {
     //           this.bars = JSON.parse(e.target.response)
     //           this.emit('change');
			  //}
			  
            httpInvoke.send();
        }

    }
		

    get allBars() { 
        return this.bars 
    }
	
    emitChange = () => {
        this.emit('change');
    }


    progressBarArea = (data) => {

        if (this.bars.length > -1) {

            let progressFinal = this.bars[data.barOf] + data.movement 

            if (progressFinal <= -1)
                this.bars[data.barOf] = 0
            else
                this.bars[data.barOf] = progressFinal

            
            this.emitChange()
        }
		 
    }

    actionHandler = (action) => {
        if (action.type == 'BAR_PROGRESS') {
            this.progressBarArea(action.data)
        }
    }
	
}

var progressBarStore = new ProgressBarStore
//dispatcher.register(ProgressBarStore..bind(this));

export default progressBarStore


