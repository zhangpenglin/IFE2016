(function(w){

    w.fireEvent=function(eventName,eventData){
        document.dispatchEvent(new CustomEvent(eventName,{"detail":eventData}))
    }


})(window)