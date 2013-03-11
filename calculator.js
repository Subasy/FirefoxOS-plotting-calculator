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
  var j=0; 
  var x;
  var y; 
  var expressionY = document.getElementById("expY").value;
  var minX = eval(document.getElementById("minX").value);
  var maxX = eval(document.getElementById("maxX").value);
  var minY = eval(document.getElementById("minY").value);
  var maxY = eval(document.getElementById("maxY").value);
  var replacement = new Function("expression","value",
    "var sin=\"Math.sin\";\n"+
	"var cos=\"Math.cos\";\n"+
	"var abs=\"Math.abs\";\n"+
	"var ceil=\"Math.ceil\";\n"+
	"var floor=\"Math.floor\";\n"+
	"var round=\"Math.round\";\n"+
	"var sqrt=\"Math.sqrt\";\n"+
	"var exp=\"Math.exp\";\n"+
	"var log=\"Math.log\";\n"+
	"var tan=\"Math.tan\";\n"+

	"if(expression.contains(\"sin\")){\n"+
	  "expression=expression.replace(\"sin\", sin);\n"+
	"}\n"+
	
	"if(expression.contains(\"cos\")){\n"+
      "expression=expression.replace(\"cos\", cos);\n"+
	"}\n"+
	
	"if(expression.contains(\"abs\")){\n"+
	  "expression=expression.replace(\"abs\", abs);\n"+
	"}\n"+
	
	"if(expression.contains(\"ln\")){\n"+
	  "expression=expression.replace(\"ln\", ln);\n"+
	"}\n"+
	
	"if(expression.contains(\"ceil\")){\n"+
	  "expression=expression.replace(\"ceil\", ceil);\n"+
	"}\n"+
	
	"if(expression.contains(\"floor\")){\n"+
	  "expression=expression.replace(\"floor\", floor);\n"+
	"}\n"+
	
	"if(expression.contains(\"round\")){\n"+
	  "expression=expression.replace(\"round\", round);\n"+
	"}\n"+
	
	"if(expression.contains(\"sqrt\")){\n"+
	  "expression=expression.replace(\"sqrt\", sqrt);\n"+
	"}\n"+
	
	"if(expression.contains(\"exp\")){\n"+
	  "expression=expression.replace(\"exp\", exp);\n"+
	"}\n"+
	
	"if(expression.contains(\"log\")){\n"+
	  "expression=expression.replace(\"log\", log);\n"+
	"}\n"+
	
	"if(expression.contains(\"tan\")){\n"+
		"expression=expression.replace(\"tan\", tan);\n"+
	"}\n"+
	
	"if(expression.contains(\"x\")){\n"+
	  "x=value;\n"+
	"}"+
	"if(expression.contains(\"y\")){\n"+
	  "y=value;\n"+
	"}"+
	"return eval(expression);\n");
	
  drawAxes(); 

  for(i=minX; i<=maxX; i=i+0.1){
    y=replacement(expressionY, i);
	if(y>=minY && y<=maxY){
	  valeurs_x[j]=i;
	  valeurs_y[j]=y;
	  j=j+1;
	}
  }

  context.beginPath(); 

  j=0; 

  while(j < valeurs_x.length){
	context.moveTo(10*valeurs_x[j],10*(valeurs_y[j]) * -1);
	context.lineTo(10*valeurs_x[j+1],10*(valeurs_y[j+1]) * -1);
	j=j+1;
  }
	
  context.lineWidth = 2; 
  context.strokeStyle = get_random_color(); 
  context.stroke(); 	
}

