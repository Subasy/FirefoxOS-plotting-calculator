var canvas;
var context; 

canvas = document.getElementById('myCanvas');
context = canvas.getContext('2d'); 
drawAxes(); 

//Function : calculate axes dimensions.
function showAxes(ctx,axes) {

  var x0=axes.x0, w=ctx.canvas.width;
  var y0=axes.y0, h=ctx.canvas.height;
  var xmin = axes.doNegativeX ? 0 : x0;

  ctx.beginPath();
  ctx.strokeStyle = "rgb(128,128,128)"; 
  ctx.moveTo(xmin,y0); ctx.lineTo(w,y0);  
  ctx.moveTo(x0,0);    ctx.lineTo(x0,h);  
  ctx.stroke();
	
}

//Function: draw axes.
function drawAxes(){

  var axes={};
  canvas.width=window.innerWidth-window.innerWidth/5;
  canvas.height=window.innerHeight-window.innerHeight/3;
  axes.x0 = .5 + .5*canvas.width;  
  axes.y0 = .5 + .5*canvas.height; 
  axes.scale = 10;                 
  axes.doNegativeX = true;
  showAxes(context,axes);
  canvas.setAttribute("style", "position: absolute; x:0; y:0;");
  context.translate(canvas.width / 2, canvas.height / 2);
}

//Function : generate random colors.
function get_random_color() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
    color += letters[Math.round(Math.random() * 10)];
  }
  return color;
}

//Function : calculate the mathematic expression and print it.
function calculate(){

  var buffer1=new ArrayBuffer(1000*4);
  var buffer2=new ArrayBuffer(1000*4); 
  var valeurs_x=new Float32Array(buffer1); 	
  var valeurs_y=new Float32Array(buffer2); 	
  var expressionY = document.getElementById("expY").value;
  var minX = parseFloat(document.getElementById("minX").value);
  var maxX = parseFloat(document.getElementById("maxX").value);
  var minY = parseFloat(document.getElementById("minY").value);
  var maxY = parseFloat(document.getElementById("maxY").value);
 
  this.worker = new Worker('myWorker.js');
  this.worker.addEventListener('message', function(e) {
    var data = e.data;
	if(data.cmd!=undefined){
	  switch(data.cmd){
	  case WORKER_MESSAGE.CMD1:
	    this.valeurs_x=data.valeurs_x;
		this.valeurs_y=data.valeurs_y;
		
		context.beginPath(); 
			
		for(j=0;j<valeurs_x.length;j++){
		  context.moveTo(10*this.valeurs_x[j],10*(this.valeurs_y[j]) * -1);
		  context.lineTo(10*this.valeurs_x[j+1],10*(this.valeurs_y[j+1]) * -1);	
		}

		context.lineWidth = 2; 
		context.strokeStyle = get_random_color(); 
		context.stroke(); 
		break;
	  }
	}
	else{
		console.log(data);
	}
  }, false);

  this.worker.postMessage({'cmd': WORKER_MANAGE_REQUEST.START});
  this.worker.postMessage({'cmd': WORKER_MANAGE_REQUEST.SET_DATA1,
  'expressionY' : expressionY,
  'minX' : minX,
  'maxX' : maxX,
  'minY' : minY,
  'maxY' : maxY
  });
  this.worker.postMessage({'cmd': WORKER_MANAGE_REQUEST.PERFORM});
  this.worker.postMessage({'cmd': WORKER_MANAGE_REQUEST.CLOSE});
}
