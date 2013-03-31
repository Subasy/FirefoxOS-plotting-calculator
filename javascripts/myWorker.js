self.addEventListener('message', function(e) {
  var data = e.data;
  switch (data.cmd) {
    case 0:
    importScripts("workerRequest.js");
    postMessage({'cmd' : WORKER_MESSAGE.LOADED});
	  break;
	case 1:
	  self.expressionY=data.expressionY;
	  self.minX=data.minX;
	  self.maxX=data.maxX;
	  self.minY=data.minY;
	  self.maxY=data.maxY;
	  break;
	case 2:
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
	  
	  for(var x=self.minX; x<=self.maxX; x+=0.1){
		var y=expression(x);
		if(y>=self.minY && y<=self.maxY){
		  valeurs_x[j]=x;
		  valeurs_y[j]=y;
		  j++;
		}
	  }

	  postMessage({'cmd' : WORKER_MESSAGE.CMD1,'valeurs_x' : valeurs_x, 'valeurs_y' : valeurs_y});
	  break;
  case 3:
    self.close();
    break;
  };
}, false);