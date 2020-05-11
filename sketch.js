let piPP;
let piDDA;
let piBH;
let partes,angulo,step,xp,yp,pPP,pDDA,pBH;
let diametro = 200;

let i;
let newPPF,newDDAF,newBHF;
let testpI,testpF;

let contCirculo=0;

function setup() {
	createCanvas(windowWidth, windowHeight);
	
	console.log(windowWidth)
	input = createInput();
	input.position(windowWidth/2-120, 65);

	button = createButton('Rebanadas');
	button.position(input.x + input.width, 65);
	button.mousePressed(greet);

	greeting = createElement('h2', 'Pizza Time?');
	greeting.position(windowWidth/2-55, 0);

	titulo = createElement('h2', 'Pizzatime!!');
	titulo.position(windowWidth/2-55, 100);
	etiquetaPP = createElement('h3', 'Punto Pendiente Fail');
	etiquetaPP.position(windowWidth/4-55, 200);
	etiquetaDDA = createElement('h3', 'DDA');
	etiquetaDDA.position(windowWidth/4*2-15, 200);
	etiquetaBH = createElement('h3', 'Bresenham');
	etiquetaBH.position(windowWidth/4*3-40, 200);
	

	
	pPP = {x:0,y:0};
	pDDA = {x:0,y:0};
	pBH = {x:0,y:0};

	frameRate(30);



	
}

function draw() {
	

	


	if(angulo<radians(360) && partes >=2){
		piPP = {x: windowWidth/4, y:400};
		piDDA = {x: (windowWidth/4)*2, y:400};
		piBH = {x: (windowWidth/4)*3, y:400};
		if (contCirculo<1) {
			circle(piPP.x, piPP.y,diametro);
			circle(piDDA.x, piDDA.y,diametro);
			circle(piBH.x, piBH.y,diametro);
		}
		contCirculo++;
		xp = Math.floor(diametro/2 * cos(angulo));
		yp = Math.floor(diametro/2 * sin(angulo));
		newPPF = {x:Math.floor(piPP.x+xp),y:Math.floor(piPP.y+yp)};
		newDDAF = {x:Math.floor(piDDA.x+xp),y:Math.floor(piDDA.y+yp)};
		newBHF = {x:Math.floor(piBH.x+xp),y:Math.floor(piBH.y+yp)};
		console.log("new P X: "+newPPF.x+"and "+newPPF.y);
		/*line(piDDA.x,piDDA.y,piDDA.x+xp,piDDA.y+yp);*/
		/*line(piBH.x,piBH.y,piBH.x+xp,piBH.y+yp)*/;

		
		/*ecuaPP(piPP, newPPF);*/
		ecuaDDA(piDDA,newDDAF);
		ecuaDDA(newDDAF,piDDA);
		ecuaBH(piBH,newBHF);
		console.log(piPP.x+" AND piPP Y: "+piPP.y)
		console.log("xp: "+xp+" AND yp: "+yp)
		console.log("step: "+step)
		console.log(radians(360))
		console.log("angulo: "+angulo)
		console.log("partes: "+ partes)
		//line(piPP.x,piPP.y,piPP.x+xp,piPP.y+yp);
		
		console.log(piPP.x)
		angulo+= step;

	}
	
}

function ecuaPP(p1,p2) {
	var dx = p2.x - p1.x;
	var dy = p2.y - p1.y;

	point(p1.x, p1.y)

	var m,b;
	let y,x;

	if (dx >dy || dy ==0) {
		m = dy / dx;
		b = p1.y - m * p1.x
		console.log(m+"&"+b)
		if (dx < 0) {
			dx = -1;
		}else{
			dx = 1
		}
		console.log(dx)
		while(p1.x !=  p2.x){
			
			p1.x += dx;
			y = m * p1.x + b;
			point(p1.x, y)
		}
	}else if (dy !=0 ) {
		m= dx / dy;
		b = p1.x - m*p1.y;
		if (p1.y < 0) {
			dy = -1;
		}else{
			dy = 1;
		}
		while(p1.y !=  p2.y){
		p1.y += dy;
		x = m * p1.y + b;
		point(x, p1.y)
		}
	}
}

function ecuaDDA(p1, p2) {
	var p,xi,yi,k;
	var dx = p2.x - p1.x;
	var dy = p2.y - p1.y;

	point(p1.x, p1.y)

	let y=p1.y,x=p1.x;
	
	if (dx > dy || dy == 0) {
		p = dx;
	} else {
		p = dy;
	}

	xi = dx / p;
    yi = dy / p;

	for(k = 0;k < p;k++){
		x += xi;
		y += yi;
		point(x, y);
	}
}


function ecuaBH(p1, p2){
	var dx = p2.x - p1.x;
	var dy = p2.y - p1.y;

	point(p1.x, p1.y)

	var m,b;
	let y,x,xEnd,stepx,stepy,p,incE,incNE;
	console.log(dx+"&"+dy)

	/* determinar que punto usar para empezar, cual para terminar */
	  if (dy < 0) { 
	    dy = -dy;
	    stepy = -1; 
	  } 
	  else{
	  	stepy = 1;
	  }  
	  if (dx < 0) {  
	    dx = -dx; 
	    stepx = -1; 
	  } 
	  else{
	  	stepx = 1;
	  } 
	    
	  x = p1.x;
	  y = p1.y;
	  point(p1.x, y)


	  if(dx>dy){
	    p = 2*dy - dx;
	    incE = 2*dy;
	    incNE = 2*(dy-dx);
	    while (x != p2.x){
	      x += stepx;
	      if (p < 0){
	        p += incE;
	      }
	      else {
	        y += stepy;
	        p += incNE;
	      }
	      point(x,y)
	    }
	  }else{
	    p = 2*dx - dy;
	    incE = 2*dx;
	    incNE = 2*(dx-dy);
	    while (y != p2.y){
	      y += stepy;
	      if (p < 0){
	        p += incE;
	      }
	      else {
	        x += stepx;
	        p += incNE;
	      }
	      point(x,y);
	    }
	  }
	}


function greet() {
	background('white');
	contCirculo =0;
	piPP = {x: windowWidth/4, y:400};
	piDDA = {x: (windowWidth/4)*2, y:400};
	piBH = {x: (windowWidth/4)*3, y:400};
	/*circle(piPP.x, piPP.y,diametro);
	circle(piDDA.x, piDDA.y,diametro);
	circle(piBH.x, piBH.y,diametro);*/
	partes = input.value();
	step = radians(360/partes);
	angulo= 0;


}
	
