import dispatcher from "./dispatcher";

export function BarOnClick(requestObj){
    dispatcher.dispatch({type:"BAR_PROGRESS", data: requestObj});
}







