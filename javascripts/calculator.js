var canvas;
var context; 

canvas = document.getElementById('myCanvas');
context = canvas.getContext('2d'); 
drawAxes(); 

  /***************************************************************
     Function showAxes(ctx,axes)
	 enables to calculate axes for the graph.
  ***************************************************************/
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

  /***************************************************************
     Function drawAxes()
	 enables to draw axes for the graph.
  ***************************************************************/
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

  /***************************************************************
     Function get_random_color()
	 enables to generate random color for each new graph.
  ***************************************************************/
function get_random_color() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
    color += letters[Math.round(Math.random() * 10)];
  }
  return color;
}

  /***************************************************************
     Function calculate()
	 enables to print the graph.
  ***************************************************************/
function calculate(){

  var buffer1=new ArrayBuffer(1000*4);
  var buffer2=new ArrayBuffer(1000*4); 
  var valeurs_x=new Float32Array(buffer1); 	
  var valeurs_y=new Float32Array(buffer2); 	
  var expressionY = document.getElementById("expY").value;
  
  /*verify if all the fields are filled.*/
  if(expressionY == "" || 
  document.getElementById("minX").value == "" || 
  document.getElementById("maxX").value=="" || 
  document.getElementById("minY").value=="" || 
  document.getElementById("maxY").value== ""){
  alert("Please fill all the field !");
  }
  
  else{
  /* If values are filled :
	 1/Recover the values.
	 2/Create the worker.
	 3/Recover the arrays filled by the worker.
	 @see "myWorker.js"  */
	 
    var minX = parseFloat(document.getElementById("minX").value);
    var maxX = parseFloat(document.getElementById("maxX").value);
    var minY = parseFloat(document.getElementById("minY").value);
    var maxY = parseFloat(document.getElementById("maxY").value);

	drawAxes(); 
	  
    this.worker = new Worker('javascripts/myWorker.js');
    this.worker.addEventListener('message', function(e) {
    var data = e.data;
	if(data.cmd!=undefined){
	  switch(data.cmd){
	  case WORKER_MESSAGE.CMD1:
	    this.valeurs_x=data.valeurs_x;
		this.valeurs_y=data.valeurs_y;
		
  /* 1/The graph is drawn thanks to the creation of coordinates 
	 with the arrays valeurs_x and valeurs_y values.
	 2/ Graph zoom depends on domain values.
	 2/Line Width is about 2 pixel.
	 3/A random color is generated for each new graph. */
	 
	context.beginPath(); 
		
	var minZoom=Math.max(minX,minY);
	var maxZoom=Math.max(maxX,maxY);
	var zoom=Math.max(minZoom,maxZoom);
	var size=Math.min(canvas.width, canvas.height);
	
	context.fillStyle = get_random_color(); 
	for(j=0;j<valeurs_x.length-2;j++){
	  context.fillRect((size/zoom)*this.valeurs_x[j],(size/zoom)*(this.valeurs_y[j]) * -1,5,5);	
	}

	context.lineWidth = 2; 
	context.stroke(); 
	break;
	  }
	}
	else{
	  console.log(data);
	}
  }, false);

  /* 1/ Initiate the worker
     2/ send the data
	 3/ do action in the data
	 4/ close the worker
	 @see "workerRequest.js" */
	 
  this.worker.postMessage({'cmd': WORKER_MANAGE_REQUEST.START});
  this.worker.postMessage({'cmd': WORKER_MANAGE_REQUEST.SET_DATA1,
  'expressionY' : expressionY,
  'minX' : minX,
  'maxX' : maxX,
  'minY' : minY,
  'maxY' : maxY,
  'size' : canvas.width
  });
  this.worker.postMessage({'cmd': WORKER_MANAGE_REQUEST.PERFORM});
  this.worker.postMessage({'cmd': WORKER_MANAGE_REQUEST.CLOSE});
  }
}
