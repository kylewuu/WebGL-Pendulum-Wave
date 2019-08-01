
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
    gl.clearColor(1.0, 1.0, 1.0, 1.0 );

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
	vec3(0,-6,0),
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




var cableM=translate(0,-armLength,0);
cableMTemp=cableM;

var modelM=translate(-0.5,-armLength-0.5,0);
modelMTemp=modelM;

cableM1=mult(translate(0,0,-2),cableM);
modelM1=mult(translate(0,0,-2),modelM);
// var cableM1=translate(0,-armLength+1,0);
// cableMTemp=cableM;
//
// var modelM1=translate(-0.5,-armLength+1-0.5,0);
// modelMTemp=modelM;
var ytranslationArray=[0,1];
var cableMTempArray=[mult(translate(0,ytranslationArray[0],0),cableM),mult(translate(0,ytranslationArray[0],0),cableM1)];
var modelMTempArray=[mult(translate(0,ytranslationArray[0],0),modelM),mult(translate(0,ytranslationArray[0],0),modelM1)];

var cableMArray=[cableM,cableM1];
var modelMArray=[modelM,modelM1];


var maxSwing=60;
var currentTheta=45;
var fg=0.2;
var angularVelocity=fg*Math.sin(currentTheta*Math.PI/180);
var swingDir= "right";
var angularAcceleration=0;
var pendulumNumber=2

var currentThetaArray=[45,55];
var angularVelocityArray=[fg*Math.sin(currentThetaArray[0]*Math.PI/180),fg*Math.sin(currentThetaArray[0]*Math.PI/180)]
var angularAccelerationArray=[0,0];
var swingDirArray=["right","right"];

setInterval(function(){
	for(var i=0;i<pendulumNumber;i++){
		// console.log(fg*Math.sin(currentTheta*Math.PI/180));
		if(swingDirArray[i]=="right"){

			angularAccelerationArray[i]=fg*Math.sin(currentThetaArray[i]*Math.PI/180);
			angularVelocityArray[i]+=angularAccelerationArray[i];
			currentThetaArray[i]-=angularVelocityArray[i];
			cableMArray[i]= mult(rotateZ(currentThetaArray[i]),cableMTempArray[i]);
			modelMArray[i] =mult(rotateZ(currentThetaArray[i]),modelMTempArray[i]);


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
	}


},20);



//render---------------------------------------
function render() {

	// matrixTempView=mult(translationM,view)



	// //


	// matrixTemp=(mult(translationM,mult(ztranslationM,rotationM)));
	// matrixTemp=(mult(translationM,rotationM));

	// cubematrixM=mult(cubereflectiveM,orbitRotationM);

	// cubeTempView=mult(orbitRotationM,view);
	// cubeTempProj=mult(orbitRotationM,persp);
	//
	// cubematrixTemp=mult(cubeTempProj,cubeTempView);

	// cubematrixTemp=mult(persp,view);
	// cubematrixTemp=mult(orbitRotationM,cubematrixTemp);
	// cubematrixTemp=orbitRotationM;


	// Binding the vertex buffer\

  gl.clear( gl.COLOR_BUFFER_BIT );


	// hidden surface removal currently messing up everything
	gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	// nmatrixTemp=mult(xrotationM,yrotationM);
	// nmatrixTemp=mult(ztranslationM,matrixTemp);
	// nmatrixTemp=mult(view,ztranslationM);
	// nmatrixTemp=mult(view,nmatrixTemp);
	// nmatrixTemp=mult(translationM,nmatrixTemp);


	// normalM=normalMatrix(nmatrixTemp);
	// normalM=normalMatrix(view); //needs to be split up because this isn't workingview
	normalM=mult(viewM,modelMArray[0]);
	var normalMLocation= gl.getUniformLocation(program,'normalM');
	gl.uniformMatrix4fv(normalMLocation,false,flatten(normalM));
	pendulumRender(cable,modelMArray[0],cableMArray[0]);

	normalM1=mult(viewM,modelMArray[1]);
	var normalMLocation= gl.getUniformLocation(program,'normalM');
	gl.uniformMatrix4fv(normalMLocation,false,flatten(normalM1));
	pendulumRender(cable1,modelMArray[1],cableMArray[1]);


	getLighting();



  window.requestAnimationFrame(render);

}
