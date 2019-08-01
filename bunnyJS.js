
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


    render();
};

//general transformations=================================
var view=lookAt(
	vec3(0,-2,10),
	vec3(0,-5,0),
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


var translationM=translate(-0.5,-5.5,0);
var cableM=mat4();
cableM=translate(0,-5,0);

// var rotationM=mult(xrotationM,yrotationM);
var rotationM=rotateZ(-10);
modelM=mult(rotationM,translationM);
cableM=mult(rotationM,cableM);



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
	normalM=mult(viewM,mult(translationM,mult(ztranslationM,rotationM)));

	// normalM=normalMatrix(nmatrixTemp);
	// normalM=normalMatrix(view); //needs to be split up because this isn't workingview
	var normalMLocation= gl.getUniformLocation(program,'normalM');
	gl.uniformMatrix4fv(normalMLocation,false,flatten(normalM));

	gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
	// gl.bindBuffer(gl.ARRAY_BUFFER, iBuffer);
	// gl.bindBuffer(gl.ARRAY_BUFFER, fBuffer);
	gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
	// gl.enableVertexAttribArray( vPosition );
	// var matrixuniformLocations= gl.getUniformLocation(program, 'matrix')
	// gl.uniformMatrix4fv(matrixuniformLocations,false,matrix);
	gl.uniformMatrix4fv(gl.getUniformLocation(program, 'modelM'),false,flatten(modelM));
	gl.uniformMatrix4fv(gl.getUniformLocation(program, 'viewM'),false,flatten(viewM));
	gl.uniformMatrix4fv(gl.getUniformLocation(program, 'projectionM'),false,flatten(projectionM));
  gl.drawElements( gl.TRIANGLES, faces.length*3,gl.UNSIGNED_SHORT,faces);
	//
	gl.bindBuffer(gl.ARRAY_BUFFER,cBuffer);
	gl.vertexAttribPointer( vPositionCube, 3, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPositionCube );
	// var matrixuniformLocationsCube= gl.getUniformLocation(program, 'matrix')
	// gl.uniformMatrix4fv(matrixuniformLocationsCube,false,cubematrix);
	gl.uniformMatrix4fv(gl.getUniformLocation(program, 'modelM'),false,flatten(cableM));
	gl.uniformMatrix4fv(gl.getUniformLocation(program, 'viewM'),false,flatten(viewM));
	gl.uniformMatrix4fv(gl.getUniformLocation(program, 'projectionM'),false,flatten(projectionM));
	gl.drawArrays(gl.LINE_STRIP, 0, cable.length );


	getLighting();

	lightPosition=mult(viewM,lightPositionTemp);
	lightPosition=mult(projectionM,lightPositionTemp);
	var positionUniformPositionLocation=gl.getUniformLocation(program,'lPosition');
	gl.uniform4fv(positionUniformPositionLocation,lightPosition);

  window.requestAnimationFrame(render);

}
