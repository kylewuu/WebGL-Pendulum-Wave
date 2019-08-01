//calculating normals
var verticesTemp=boxVertices;
var normalVArray= new Array(verticesTemp.length);
for(var i=0;i<verticesTemp.length;i++){
  normalVArray[i]=vec3(0.0,0.0,0.0);
}
// var normalVArray = get_vertices();
// for(i = 0; i < normalVArray.length)
var vertexIndexA;
var vertexIndexB;
var vertexIndexC;

var verticeA;
var verticeB;
var verticeC;

var normalResult;

var facesTemp=boxFaces;


for( var i=0; i<facesTemp.length;i++){
  vertexIndexA= facesTemp[i][0];
  vertexIndexB= facesTemp[i][1];
  vertexIndexC= facesTemp[i][2];

  //selecting the vertices
  verticeA=verticesTemp[vertexIndexA];
  verticeB=verticesTemp[vertexIndexB];
  verticeC=verticesTemp[vertexIndexC];

  //cross product of the two edges
  // console.log(i);
  normalResult=cross(subtract(verticeB,verticeA),subtract(verticeC,verticeA));

  //add because there is overlap
  normalVArray[vertexIndexA]=add(normalResult,normalVArray[vertexIndexA]);
  normalVArray[vertexIndexB]=add(normalResult,normalVArray[vertexIndexB]);
  normalVArray[vertexIndexC]=add(normalResult,normalVArray[vertexIndexC]);

}

//these values were tested randomly until it looked right
var lightPositionTemp = vec4(5, 5, 0, 0.0);
var lightAmbient = vec4(0.050, 0.023, 0, 1.0);
var lightDiffuse = vec4(1, 0.717, 0,1);
var lightSpecular = vec4(1, 0.823, 0.290, 1.0);
//reflection coefficients
var ka=0.2; //ambient
var kd=0.8; //diffuse
var ks=1.0; //specular
var shininessLvl=4;

//loading lighting into render-- there's too much so it's just gonna get put into a function to keep things neat and readable
function getLighting(){
	// var positionUniformPositionLocation=gl.getUniformLocation(program,'lPosition');
	// gl.uniform4fv(positionUniformPositionLocation,lightPosition);
	var ambientUniformPositionLocation= gl.getUniformLocation(program,'ambientColour');
	gl.uniform4fv(ambientUniformPositionLocation,lightAmbient);
	var diffuseUniformPositionLocation= gl.getUniformLocation(program,'diffuseColour');
	gl.uniform4fv(diffuseUniformPositionLocation,lightDiffuse);
	var specularUniformPositionLocation= gl.getUniformLocation(program,'specularColour');
	gl.uniform4fv(specularUniformPositionLocation,lightSpecular);

	var kaUniformLocation= gl.getUniformLocation(program, 'ka');
	gl.uniform1f(kaUniformLocation,ka);
	var kdUniformLocation= gl.getUniformLocation(program, 'kd');
	gl.uniform1f(kdUniformLocation,kd);
	var ksUniformLocation= gl.getUniformLocation(program, 'ks');
	gl.uniform1f(ksUniformLocation,ks);
	var shininessLocation= gl.getUniformLocation(program,'shininessLvl')
	gl.uniform1f(shininessLocation,shininessLvl);

	lightPosition=mult(viewM,lightPositionTemp);
	lightPosition=mult(projectionM,lightPositionTemp);
	var positionUniformPositionLocation=gl.getUniformLocation(program,'lPosition');
	gl.uniform4fv(positionUniformPositionLocation,lightPosition);
}

///
// var ytranslationArray=[
// 	-pendulumHArray[0],
// 	-pendulumHArray[1],
// 	-pendulumHArray[2],
// 	-pendulumHArray[3],
// 	-pendulumHArray[4],
// 	-pendulumHArray[5],
// 	-pendulumHArray[6],
// 	-pendulumHArray[7],
// 	-pendulumHArray[8],
// ];
//
// var armLengthArray=[
// 	11.04,
// 	11.82,
// 	12.67,
// 	13.63,
// 	14.70,
// 	15.90,
// 	17.25,
// 	18.78,
// 	20.53
// ];
// var pendulumHArray=[
// 	0,
// 	0.78,
// 	0.85,
// 	0.96,
// 	1.07,
// 	1.2,
// 	1.35,
// 	1.53,
// 	1.75
// ];
//
// var cable=[
// 	vec3(0,armLengthArray[0],-0.5),
// 	vec3(0,0,-0.5)
// ]
//
//
// var cable1=[
// 	vec3(0,armLengthArray[1],-0.5),
// 	vec3(0,0,-0.5)
// ]
//
// var cable2=[
// 	vec3(0,armLengthArray[2],-0.5),
// 	vec3(0,0,-0.5)
// ]
// var cable3=[
// 	vec3(0,armLengthArray[3],-0.5),
// 	vec3(0,0,-0.5)
// ]
// var cable4=[
// 	vec3(0,armLengthArray[4],-0.5),
// 	vec3(0,0,-0.5)
// ]
// var cable5=[
// 	vec3(0,armLengthArray[5],-0.5),
// 	vec3(0,0,-0.5)
// ]
// var cable6=[
// 	vec3(0,armLengthArray[6],-0.5),
// 	vec3(0,0,-0.5)
// ]
// var cable7=[
// 	vec3(0,armLengthArray[7],-0.5),
// 	vec3(0,0,-0.5)
// ]
// var cable8=[
// 	vec3(0,armLengthArray[8],-0.5),
// 	vec3(0,0,-0.5)
// ]


//--------------
var pendulumNumber=9;
var cableM=translate(0,-pendulumHArray[0],0);
var modelM=translate(-0.5,-pendulumHArray[0]-0.5,0);

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

var ytranslationArray=[
	pendulumHArray[0],
	pendulumHArray[0]+pendulumHArray[1],
	pendulumHArray[0]+pendulumHArray[1]+pendulumHArray[2],
	pendulumHArray[0]+pendulumHArray[1]+pendulumHArray[2]+pendulumHArray[3],
	pendulumHArray[0]+pendulumHArray[1]+pendulumHArray[2]+pendulumHArray[3]+pendulumHArray[4],
	pendulumHArray[0]+pendulumHArray[1]+pendulumHArray[2]+pendulumHArray[3]+pendulumHArray[4]+pendulumHArray[5],
	pendulumHArray[0]+pendulumHArray[1]+pendulumHArray[2]+pendulumHArray[3]+pendulumHArray[4]+pendulumHArray[6],
	pendulumHArray[0]+pendulumHArray[1]+pendulumHArray[2]+pendulumHArray[3]+pendulumHArray[4]+pendulumHArray[6]+pendulumHArray[7],
	pendulumHArray[0]+pendulumHArray[1]+pendulumHArray[2]+pendulumHArray[3]+pendulumHArray[4]+pendulumHArray[6]+pendulumHArray[7]+pendulumHArray[8]
];
for(var i=0;i<pendulumNumber;i++){
	ytranslationArray[i]=-ytranslationArray[i];
}

//-----------------------
var armLengthArray=[
	11.04,
	11.82,
	12.67,
	13.63,
	14.70,
	15.90,
	17.25,
	18.78,
	20.53
];
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

var cable=[
	vec3(0,armLengthArray[0],-0.5),
	vec3(0,0,-0.5)
]
