function BrainSocketPubSub(){
	this.subscriptions = [];
	this.channel = null;

	this.forget = function(args){
		for(x=0;x<this.subscriptions.length;x++){
			if(this.subscriptions[x].name == args[0], this.subscriptions[x].callback == args[1])
				this.subscriptions.splice(x, 1);
		}
	}

	this.listen = function(name, callback){
		
		
		this.subscriptions.push({"name": this.getEventName(name), "callback": callback});
		return [name,callback];
	}

	this.fire = function(name, args){
		var temp = [];
		if(this.subscriptions.length > 0){
			for(var x=0;x<this.subscriptions.length;x++) {
				if(this.subscriptions[x].name == this.getEventName(name))
					temp.push({"fn":this.subscriptions[x].callback});
			}
			for(x=0;x<temp.length;x++){
				temp[x].fn.apply(this,[args]);
			}
		}
	}

}

BrainSocketPubSub.prototype.setChannel = function(channel){
		this.channel = channel;
}

BrainSocketPubSub.prototype.getEventName = function(event){
		return this.channel+'.'+event;
}