
var canvas = document.getElementById( "gl-canvas" );
var gl;
var vPosition;
var vPositionCube;
var vPositionN;

var vertices= boxVertices;
var faces=boxFaces;

//init
window.onload = function init() {

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor(0.874, 0.933, 0.980, 1.0 );

		program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

		vBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
		gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

		iBuffer=gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,iBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(flatten(faces)),gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
    // gl.enableVertexAttribArray( vPosition );

		nBuffer=gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER,nBuffer);
		gl.bufferData(gl.ARRAY_BUFFER,flatten(normalVArray),gl.STATIC_DRAW);

		var vPositionN=gl.getAttribLocation(program,"vPositionN");
		gl.vertexAttribPointer(vPositionN,3,gl.FLOAT,false,0,0);
		gl.enableVertexAttribArray(vPositionN);

		fBuffer=gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, fBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, faces.length, gl.STATIC_DRAW);

		cBuffer=gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER,cBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, flatten(cable),gl.STATIC_DRAW);

		var vPositionCube = gl.getAttribLocation( program, "vPosition" );
		gl.vertexAttribPointer( vPositionCube, 3, gl.FLOAT, false, 0, 0 );
    // gl.enableVertexAttribArray( vPositionCube );

		//second pendulum-----------------------------------------------------------------


    render();
};

//general transformations=================================
var view=lookAt(
	vec3(0,-2,10),
	vec3(0,-4,0),
	vec3(0,1,0)
);

var persp=perspective(
	70,
	canvas.width/canvas.height,
	0.1,
	1000
);


var modelM=mat4();
var viewM=view;
var projectionM=persp;

// console.log(translate(0,0,0));




var pendulumNumber=9;
var cableM=translate(0,-armLengthArray[0],0);
var modelM=translate(-0.5,-armLengthArray[0]-0.5,0);

var cableMArray=[
	cableM,
	mult(translate(0,0,-2),cableM),
	mult(translate(0,0,-4),cableM),
	mult(translate(0,0,-6),cableM),
	mult(translate(0,0,-8),cableM),
	mult(translate(0,0,-10),cableM),
	mult(translate(0,0,-12),cableM),
	mult(translate(0,0,-14),cableM),
	mult(translate(0,0,-16),cableM)


];
var modelMArray=[
	modelM,
	mult(translate(0,0,-2),modelM),
	mult(translate(0,0,-4),modelM),
	mult(translate(0,0,-6),modelM),
	mult(translate(0,0,-8),modelM),
	mult(translate(0,0,-10),modelM),
	mult(translate(0,0,-12),modelM),
	mult(translate(0,0,-14),modelM),
	mult(translate(0,0,-16),modelM)

];

// var ytranslationArray=[0,-1*pendulumH,-2*pendulumH,-3*pendulumH,-4*pendulumH,-5*pendulumH,-6*pendulumH,-7*pendulumH, -8*pendulumH];
console.log(ytranslationArray)

var pendulumHArray=[
	0,
	0.78,
	0.85,
	0.96,
	1.07,
	1.2,
	1.35,
	1.53,
	1.75
];

var ytranslationArray=[
	pendulumHArray[0],
	pendulumHArray[0]+pendulumHArray[1],
	pendulumHArray[0]+pendulumHArray[1]+pendulumHArray[2],
	pendulumHArray[0]+pendulumHArray[1]+pendulumHArray[2]+pendulumHArray[3],
	pendulumHArray[0]+pendulumHArray[1]+pendulumHArray[2]+pendulumHArray[3]+pendulumHArray[4],
	pendulumHArray[0]+pendulumHArray[1]+pendulumHArray[2]+pendulumHArray[3]+pendulumHArray[4]+pendulumHArray[5],
	pendulumHArray[0]+pendulumHArray[1]+pendulumHArray[2]+pendulumHArray[3]+pendulumHArray[4]+pendulumHArray[5]+pendulumHArray[6],
	pendulumHArray[0]+pendulumHArray[1]+pendulumHArray[2]+pendulumHArray[3]+pendulumHArray[4]+pendulumHArray[5]+pendulumHArray[6]+pendulumHArray[7],
	pendulumHArray[0]+pendulumHArray[1]+pendulumHArray[2]+pendulumHArray[3]+pendulumHArray[4]+pendulumHArray[5]+pendulumHArray[6]+pendulumHArray[7]+pendulumHArray[8]
];
for(var i=0;i<pendulumNumber;i++){
	ytranslationArray[i]=-ytranslationArray[i];
}

var cableMTempArray=[
	mult(translate(0,ytranslationArray[0],0),cableM),
	mult(translate(0,ytranslationArray[1],0),cableMArray[1]),
	mult(translate(0,ytranslationArray[2],0),cableMArray[2]),
	mult(translate(0,ytranslationArray[3],0),cableMArray[3]),
	mult(translate(0,ytranslationArray[4],0),cableMArray[4]),
	mult(translate(0,ytranslationArray[5],0),cableMArray[5]),
	mult(translate(0,ytranslationArray[6],0),cableMArray[6]),
	mult(translate(0,ytranslationArray[7],0),cableMArray[7]),
	mult(translate(0,ytranslationArray[8],0),cableMArray[8])

];
var modelMTempArray=[
	mult(translate(0,ytranslationArray[0],0),modelM),
	mult(translate(0,ytranslationArray[1],0),modelMArray[1]),
	mult(translate(0,ytranslationArray[2],0),modelMArray[2]),
	mult(translate(0,ytranslationArray[3],0),modelMArray[3]),
	mult(translate(0,ytranslationArray[4],0),modelMArray[4]),
	mult(translate(0,ytranslationArray[5],0),modelMArray[5]),
	mult(translate(0,ytranslationArray[6],0),modelMArray[6]),
	mult(translate(0,ytranslationArray[7],0),modelMArray[7]),
	mult(translate(0,ytranslationArray[8],0),modelMArray[8])

];


var cableMTemp1Array=new Array(pendulumNumber);
var fg=0.5;
var maxSwing=90;
var swingStart=60;
// var currentThetaArray=[swingStart,swingStart-5,swingStart-10,swingStart-15,swingStart-20,swingStart-25,swingStart-30,swingStart-35,swingStart-40];
var currentThetaArray=[60,53.9863091,48.99138513,44.54437953,40.57197455,36.96418968,33.65950298,30.60397938,27.75584792]
var angularVelocityArray=[
	fg*Math.sin(currentThetaArray[0]*Math.PI/180),
	fg*Math.sin(currentThetaArray[1]*Math.PI/180),
	fg*Math.sin(currentThetaArray[2]*Math.PI/180),
	fg*Math.sin(currentThetaArray[3]*Math.PI/180),
	fg*Math.sin(currentThetaArray[4]*Math.PI/180),
	fg*Math.sin(currentThetaArray[5]*Math.PI/180),
	fg*Math.sin(currentThetaArray[6]*Math.PI/180),
	fg*Math.sin(currentThetaArray[7]*Math.PI/180),
	fg*Math.sin(currentThetaArray[8]*Math.PI/180)

];
var angularAccelerationArray=[0,0,0,0,0,0,0,0,0];
var swingDirArray=["right","right","right","right","right","right","right","right","right"];

setInterval(function(){
	for(var i=0;i<pendulumNumber;i++){

		if(swingDirArray[i]=="right"){
			// cableMTempArray[i]=mult(translate(0,ytranslationArray[i],0),cableMTempArray[i]);
			// cableMTempArray[i]=mult(translate(0,-ytranslationArray[i],0),cableMTempArray[i]);


			angularAccelerationArray[i]=fg*Math.sin(currentThetaArray[i]*Math.PI/180);
			angularVelocityArray[i]+=angularAccelerationArray[i];
			currentThetaArray[i]-=angularVelocityArray[i];
			cableMArray[i]= mult(rotateZ(currentThetaArray[i]),cableMTempArray[i]);
			modelMArray[i] =mult(rotateZ(currentThetaArray[i]),modelMTempArray[i]);

			// cableMTemp1Array[i]= mult(rotateZ(currentThetaArray[i]),cableMTempArray[i]);
			// modelMArray[i] =mult(rotateZ(currentThetaArray[i]),modelMTempArray[i]);
			//
			// cableMArray[i]=mult(translate(0,-ytranslationArray[i],0),cableMTemp1Array[i]);
			// cableMTempArray[i]=cableM[i];


			if( currentThetaArray[i]>= maxSwing){
				swingDirArray[i]="left";
			}
		}
		else if(swingDirArray[i]== "left"){
			angularAccelerationArray[i]=fg*Math.sin(currentThetaArray[i]*Math.PI/180);
			angularVelocityArray[i]-=angularAccelerationArray[i]
			currentThetaArray[i]+=angularVelocityArray[i];
			cableMArray[i]= mult(rotateZ(currentThetaArray[i]),cableMTempArray[i]);
			modelMArray[i]=mult(rotateZ(currentThetaArray[i]),modelMTempArray[i]);

			cableMArray[i]= mult(translate(0,ytranslationArray[i],0),cableMTempArray[i]);
			modelMArray[i]=mult(translate(0,ytranslationArray[i],0),modelMTempArray[i]);

			if( currentThetaArray[i]<= -maxSwing){
				swingDirArray[i]="right";
			}
		}
		cableMArray[i]=mult(translate(0,-ytranslationArray[i],0),cableMArray[i]);
		modelMArray[i]=mult(translate(0,-ytranslationArray[i],0),modelMArray[i]);

	}


},20);



//render---------------------------------------
function render() {


  gl.clear( gl.COLOR_BUFFER_BIT );


	// hidden surface removal currently messing up everything
	gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


	normalM=mult(viewM,modelMArray[0]);
	var normalMLocation= gl.getUniformLocation(program,'normalM');
	gl.uniformMatrix4fv(normalMLocation,false,flatten(normalM));
	pendulumRender(cable,modelMArray[0],cableMArray[0]);

	normalM1=mult(viewM,modelMArray[1]);
	var normalMLocation= gl.getUniformLocation(program,'normalM');
	gl.uniformMatrix4fv(normalMLocation,false,flatten(normalM1));
	pendulumRender(cable1,modelMArray[1],cableMArray[1]);

	normalM2=mult(viewM,modelMArray[2]);
	var normalMLocation= gl.getUniformLocation(program,'normalM');
	gl.uniformMatrix4fv(normalMLocation,false,flatten(normalM2));
	pendulumRender(cable2,modelMArray[2],cableMArray[2]);

	normalM3=mult(viewM,modelMArray[3]);
	var normalMLocation= gl.getUniformLocation(program,'normalM');
	gl.uniformMatrix4fv(normalMLocation,false,flatten(normalM3));
	pendulumRender(cable3,modelMArray[3],cableMArray[3]);

	normalM4=mult(viewM,modelMArray[4]);
	var normalMLocation= gl.getUniformLocation(program,'normalM');
	gl.uniformMatrix4fv(normalMLocation,false,flatten(normalM4));
	pendulumRender(cable4,modelMArray[4],cableMArray[4]);

	normalM5=mult(viewM,modelMArray[5]);
	var normalMLocation= gl.getUniformLocation(program,'normalM');
	gl.uniformMatrix4fv(normalMLocation,false,flatten(normalM5));
	pendulumRender(cable5,modelMArray[5],cableMArray[5]);

	normalM6=mult(viewM,modelMArray[6]);
	var normalMLocation= gl.getUniformLocation(program,'normalM');
	gl.uniformMatrix4fv(normalMLocation,false,flatten(normalM6));
	pendulumRender(cable6,modelMArray[6],cableMArray[6]);

	normalM7=mult(viewM,modelMArray[7]);
	var normalMLocation= gl.getUniformLocation(program,'normalM');
	gl.uniformMatrix4fv(normalMLocation,false,flatten(normalM7));
	pendulumRender(cable7,modelMArray[7],cableMArray[7]);

	normalM8=mult(viewM,modelMArray[8]);
	var normalMLocation= gl.getUniformLocation(program,'normalM');
	gl.uniformMatrix4fv(normalMLocation,false,flatten(normalM8));
	pendulumRender(cable8,modelMArray[8],cableMArray[8]);


	getLighting();



  window.requestAnimationFrame(render);

}
