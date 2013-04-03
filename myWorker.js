self.addEventListener('message', function(e) {
  var data = e.data;
  switch (data.cmd) {
    case "start":
	//get the request name description file
    importScripts("workerRequest.js"); 
	  postMessage({'cmd' : WORKER_MESSAGE.LOADED});
	  break;
	case "set_data":
	  //Get the values
	  self.expressionY=data.expressionY;
	  self.minX=data.minX;
	  self.maxX=data.maxX;
	  self.minY=data.minY;
	  self.maxY=data.maxY;
	  self.size=data.size;
	  break;
	case "perform":
	  //calculate the arrays values
	  var expression = eval("(function(x) {"+
		"var ln=Math.ln;"+
		"var sin=Math.sin;"+
		"var cos=Math.cos;"+
		"var abs=Math.abs;"+
		"var ceil=Math.ceil;"+
		"var floor=Math.floor;"+
		"var round=Math.round;"+
		"var sqrt=Math.sqrt;"+
		"var exp=Math.exp;"+
		"var log=Math.log;"+
		"var tan=Math.tan;"+
		"var x=x;"+
		"return "+self.expressionY+";})");
		
	  var buffer1=new ArrayBuffer(1000*4);
	  var buffer2=new ArrayBuffer(1000*4); 
	  var valeurs_x=new Float32Array(buffer1); 	
	  var valeurs_y=new Float32Array(buffer2); 	
	  var j=0; 
	  var x;
	  var y; 
	  
	  for(var x=self.minX; x<=self.maxX; x+=((Math.abs(self.maxX)+Math.abs(self.minX))/self.size)){
		var y=expression(x);
		if(y>=self.minY && y<=self.maxY){
		  valeurs_x[j]=x;
		  valeurs_y[j]=y;
		  j++;
		}
	  }
      
	  //send the arrays to "calculator.js".
	  postMessage({'cmd' : WORKER_MESSAGE.CMD1,'valeurs_x' : valeurs_x, 'valeurs_y' : valeurs_y});
	  break;
  case "close":
	//close the worker.
    self.close();
    break;
  };
}, false);
