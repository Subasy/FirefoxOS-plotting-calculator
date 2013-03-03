//Fonction permettant de calculer le résultat des différentes fonctions
function calculer(){
		
	//tableau des valeurs des abscisses
	valeurs_x=new Array();
	
	//tableau des valeurs des ordonnées
	valeurs_y=new Array();
	
	var x; // la variable des abscisses
	var y; // la variable des ordonnées
	
	//Récupération de la formule dans l'input d'id exp
	expression = document.getElementById("exp").value;

	//Si l'expression contient une variable x
		if(expression.contains("sin")){
			expression=expression.replace("sin", "Math.sin");
		}
		
		if(expression.contains("cos")){
			expression=expression.replace("cos", "Math.cos");
		}
		
		if(expression.contains("abs")){
			expression=expression.replace("abs", "Math.abs");
		}
		
		if(expression.contains("ceil")){
			expression=expression.replace("ceil", "Math.ceil");
		}
		
		if(expression.contains("floor")){
			expression=expression.replace("floor", "Math.floor");
		}
		
		if(expression.contains("round")){
			expression=expression.replace("round", "Math.round");
		}
		
		if(expression.contains("sqrt")){
			expression=expression.replace("sqrt", "Math.sqrt");
		}
		
		if(expression.contains("exp")){
			expression=expression.replace("exp", "Math.exp");
		}
		
		if(expression.contains("log")){
			expression=expression.replace("log", "Math.log");
		}
		
		if(expression.contains("tan")){
			expression=expression.replace("tan", "Math.tan");
		}
		//Pour 20000 milles valeurs
		for(i=-10000;i<=10000;i++){
		
			//x prend la valeur de i
			x=i;
			
			//Ajout de i dans le tableau des abscisses
			valeurs_x.push(x);
			
			//évaluation de l'expression
			y=eval(expression);
			
			//Ajout de la valeur de y dans le tableau des ordonnées
			valeurs_y.push(y);
		}
	
	
	//récupération de l'emplacement du canvas
	var canvas = document.getElementById('myCanvas');
	
	//définition du style du canvas
	var context = canvas.getContext('2d');
	
	//placement de l'origine au milieu du canvas
	canvas.setAttribute("style", "position: absolute; x:0; y:0;");
	context.restore();
	context.save();
	context.translate(canvas.width / 2, canvas.height / 2);
	context.beginPath();
	
	//initation de la variable permettant le parcours des tableaux de coordonnées.
	var j=0;
	
	//Se placer à l'origine
	//context.moveTo(0,0);
	
	//Tant qu'ils existe des valeur dans le tableau
	while(j<19999){
	
		//Tracer la liaison vers le point suivant
		context.moveTo(10*valeurs_x[j],10*(valeurs_y[j])* -1);
		context.lineTo(10*valeurs_x[j+1],10*(valeurs_y[j+1]) * -1);
		j++;
		
	}

	//épaisseur de la ligne
	context.lineWidth = 2;
	
	function get_random_color() {
		var letters = '0123456789ABCDEF'.split('');
		var color = '#';
		for (var i = 0; i < 6; i++ ) {
			color += letters[Math.round(Math.random() * 10)];
		}
		return color;
	}
	//couleur de la ligne
	context.strokeStyle = get_random_color();
	
	//tracer la ligne
	context.stroke();
	
}

//Fonction calculant les axes
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

			
	//récupération de l'emplacement du canvas
	var canvas = document.getElementById('myCanvas');
	
	//définition du style du canvas
	var context = canvas.getContext('2d');
	
	//dessiner les axes
	var axes={}, ctx=canvas.getContext("2d");
	canvas.width=window.innerWidth;
	canvas.height=window.innerHeight;
	axes.x0 = .5 + .5*canvas.width;  // x0 pixels from left to x=0
	axes.y0 = .5 + .5*canvas.height; // y0 pixels from top to y=0
	axes.scale = 40;                 // 40 pixels from x=0 to x=1
	axes.doNegativeX = true;
	showAxes(ctx,axes);
			
		
