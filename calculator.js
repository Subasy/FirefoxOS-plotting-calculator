var canvas;
var context; 

canvas = document.getElementById('myCanvas');//Get the canvas
context = canvas.getContext('2d'); //had a style for the canvas
drawAxes(); // Draw the axes.

//Function : calculate axes dimensions.
function showAxes(ctx,axes) {

	var x0=axes.x0, w=ctx.canvas.width;
	var y0=axes.y0, h=ctx.canvas.height;
	var xmin = axes.doNegativeX ? 0 : x0;
	
	ctx.beginPath();
	ctx.strokeStyle = "rgb(128,128,128)"; 
	ctx.moveTo(xmin,y0); ctx.lineTo(w,y0);  // X axis
	ctx.moveTo(x0,0);    ctx.lineTo(x0,h);  // Y axis
	ctx.stroke();
	
}

//Function: draw axes.
function drawAxes(){

	var axes={};//, ctx=canvas.getContext("2d");
	canvas.width=window.innerWidth-window.innerWidth/5;
	canvas.height=window.innerHeight-window.innerHeight/3;
	axes.x0 = .5 + .5*canvas.width;  // x0 pixels from left to x=0
	axes.y0 = .5 + .5*canvas.height; // y0 pixels from top to y=0
	axes.scale = 10;                 // 40 pixels from x=0 to x=1
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

	var buffer1=new ArrayBuffer(1000*4); //buffer for x values
	var buffer2=new ArrayBuffer(1000*4); // buffer for y values
	var valeurs_x=new Int32Array(buffer1); 	//typed array for x values
	var valeurs_y=new Int32Array(buffer2); 	//typed array for y values
	var j=0; // an iterator
	var x; // x value variable
	var y; // y value variable
	var expressionY = document.getElementById("expY").value;//Get the formula entered the user for F(Y)
	var expressionX= document.getElementById("expX").value; //Get the formule entered by the user for F(X)
	var ok=true;
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
		
	drawAxes(); // draw the axes.
	
	if(expressionY != "" && expressionX != ""){
		alert("You must enter only one expression ! ");
		ok =false;
	}
		
	if(expressionY.contains("y")){
		alert("You must only enter an expression containing x");
		expressionY="";
	}

	if(expressionX.contains("x")){
		alert("You must only enter an expression containing y");
		expressionX="";
	}
	
	if(expressionY != "" && ok){
		//for 20000 values of x.
		for(i=-500;i<=500;i++){

			valeurs_x[j]=i; //add x to the x .
			y=replacement(expressionY,i); //evaluate the formula.
			valeurs_y[j]=y; //Add the evaluated value of y in y array.
			j++;
		}

		context.beginPath(); // init the drawing path

		var j=0; //a variable to lookup the arrays values.

		//While the array has values.
		while(j<1000){

		//Draw the liaison beetween x and y values.
		context.moveTo(10*valeurs_x[j],10*(valeurs_y[j])* -1);
		context.lineTo(10*valeurs_x[j+1],10*(valeurs_y[j+1]) * -1);
		j++;

		}
	}
	
	if(expressionX != "" && ok){
		//for 20000 values of x.
		for(i=-500;i<=500;i++){
			valeurs_y[j]=i; //add x to the x .
			x=replacement(expressionX,i); //evaluate the formula.
			valeurs_x[j]=x; //Add the evaluated value of y in y array.
			j++;
		}
		
		context.beginPath(); // init the drawing path
		
		j=0; //a variable to lookup the arrays values.

		//While the array has values.
		while(j<1000){
			//Draw the liaison beetween x and y values.
			context.moveTo(10*valeurs_x[j],10*(valeurs_y[j])* -1);
			context.lineTo(10*valeurs_x[j+1],10*(valeurs_y[j+1]) * -1);
			j++;	
		}
	
	}
	
	context.lineWidth = 2; //line growth
	context.strokeStyle = get_random_color(); // line color
	context.stroke(); // draw the lines
	
	
}
