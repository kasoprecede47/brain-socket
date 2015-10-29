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
	
	this.setChannel = function(channel){
		this.channel = channel;
	}
	
	this.getEventName = function(event){
		return this.channel+'.'+event;
	}
}

function BrainSocket(WebSocketConnection,Channel,BrainSocketPubSub){
	this.connection = WebSocketConnection;
	
	BrainSocketPubSub.setChannel(Channel);
	
	this.Event = BrainSocketPubSub;
	this.Channel = Channel;

	this.connection.BrainSocket = this;

	this.connection.digestMessage = function(data){
		try{
			var object = JSON.parse(data);

			if(object.server && object.server.event){
				this.BrainSocket.Event.fire(object.server.event,object);
			}else{
				this.BrainSocket.Event.fire(object.client.event,object);
			}

		}catch(e){
			this.BrainSocket.Event.fire(data);
		}
	}

	this.connection.onerror = function(e){
		console.log(e);
	}

	this.connection.onmessage = function(e) {
		this.digestMessage(e.data);
	}

	this.success = function(data){
		this.message('app.success',data);
	}

	this.error = function(data){
		this.message('app.error',data);
	}

	this.message = function(event,data){
		var json = {client:{}};
		json.client.event = event;

		if(!data){
			data = [];
		}

		json.client.data = data;

		this.connection.send(JSON.stringify(json));
	}
}