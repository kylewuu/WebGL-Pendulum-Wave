//wireframe
var cubeVertices = [
		// vec3(0, 0, 0),
    vec3(5, 5, 0),
		vec3(5.5, 5, 0),
		vec3(5.5, 5.5, 0),
		vec3(5, 5.5, 0),
		vec3(5, 5.5, 0),
		vec3(5, 5, 0),
		vec3(5, 5, 0.5),
		vec3(5.5, 5, 0.5),
		vec3(5.5, 5, 0),
		vec3(5.5, 5, 0.5),
		vec3(5.5, 5.5, 0.5),
		vec3(5.5, 5.5, 0),
		vec3(5.5, 5.5, 0.5),
		vec3(5, 5.5, 0.5),
		vec3(5, 5.5, 0),
		vec3(5, 5.5, 0.5),
		vec3(5, 5, 0.5)
  ];

	//drawing the cone
	var hexagonVal= 0.866025; //result of the calculation for the hex on the bottom
	var hexH= 3.232049391;
	var coneVertices=[
		vec3(0,2,1),
		vec3(0,2+hexH,0),
		vec3(0,2,1),

		vec3(hexagonVal,2,0.5),
		vec3(0,2+hexH,0),
		vec3(hexagonVal,2,0.5),

		vec3(hexagonVal,2,-0.5),
		vec3(0,2+hexH,0),
		vec3(hexagonVal,2,-0.5),

		vec3(0,2,-1),
		vec3(0,2+hexH,0),
		vec3(0,2,-1),

		vec3(-hexagonVal,2,-0.5),
		vec3(0,2+hexH,0),
		vec3(-hexagonVal,2,-0.5),

		vec3(-hexagonVal,2,0.5),
		vec3(0,2+hexH,0),
		vec3(-hexagonVal,2,0.5),

		vec3(0,2,1),

	]


  var boxVertices=[
    //front face
    vec3(0,0,0),
    vec3(1,0,0),
    vec3(1,1,0),
    vec3(0,1,0),

    //bottom face
    vec3(0,0,0),
    vec3(1,0,0),
    vec3(1,0,-1),
    vec3(0,0,-1),

    //top face
    vec3(0,1,0),
    vec3(1,1,0),
    vec3(1,1,-1),
    vec3(0,1,-1),

    //left face
    vec3(0,0,0),
    vec3(0,1,0),
    vec3(0,1,-1),
    vec3(0,0,-1),

    //right face
    vec3(1,0,0),
    vec3(1,1,0),
    vec3(1,1,-1),
    vec3(1,0,-1),

    //back face
    vec3(0,0,-1),
    vec3(1,0,-1),
    vec3(1,1,-1),
    vec3(0,1,-1)

  ]

  var boxFaces=[
    vec3(0,1,2),
    vec3(0,2,3),

    vec3(4,5,6),
    vec3(4,6,7),

    vec3(8,9,10),
    vec3(8,10,11),

    vec3(12,13,14),
    vec3(12,14,15),

    vec3(16,17,18),
    vec3(16,18,19),

    vec3(20,21,22),
    vec3(20,22,23),
  ]

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
	var cable1=[
		vec3(0,armLengthArray[1],-0.5),
		vec3(0,0,-0.5)
	]
	var cable2=[
		vec3(0,armLengthArray[2],-0.5),
		vec3(0,0,-0.5)
	]

	var cable3=[
		vec3(0,armLengthArray[3],-0.5),
		vec3(0,0,-0.5)
	]
	var cable4=[
		vec3(0,armLengthArray[4],-0.5),
		vec3(0,0,-0.5)
	]
	var cable5=[
		vec3(0,armLengthArray[5],-0.5),
		vec3(0,0,-0.5)
	]
	var cable6=[
		vec3(0,armLengthArray[6],-0.5),
		vec3(0,0,-0.5)
	]
	var cable7=[
		vec3(0,armLengthArray[7],-0.5),
		vec3(0,0,-0.5)
	]
	var cable8=[
		vec3(0,armLengthArray[8],-0.5),
		vec3(0,0,-0.5)
	]


	// var pendulumNumber=3;
	// var cableM=translate(0,-armLength,0);
	// var modelM=translate(-0.5,-armLength-0.5,0);
	//
	// var cableMArray=[
	// 	cableM,
	// 	mult(translate(0,0,-2),cableM),
	// 	mult(translate(0,0,-4),cableM)
	//
	// ];
	// var modelMArray=[
	// 	modelM,
	// 	mult(translate(0,0,-2),modelM),
	// 	mult(translate(0,0,-4),modelM)
	//
	// ];
	//
	// var ytranslationArray=[0,-1,-2];
	// var cableMTempArray=[
	// 	mult(translate(0,ytranslationArray[0],0),cableM),
	// 	mult(translate(0,ytranslationArray[1],0),cableMArray[1]),
	// 	mult(translate(0,ytranslationArray[2],0),cableMArray[2])
	// ];
	// var modelMTempArray=[
	// 	mult(translate(0,ytranslationArray[0],0),modelM),
	// 	mult(translate(0,ytranslationArray[1],0),modelMArray[1]),
	// 	mult(translate(0,ytranslationArray[2],0),modelMArray[2])
	// ];
	//
	//
	// var cableMTemp1Array=new Array(pendulumNumber);
	// var fg=0.3;
	// var maxSwing=90;
	// var currentThetaArray=[45,65,65];
	// var angularVelocityArray=[fg*Math.sin(currentThetaArray[0]*Math.PI/180),fg*Math.sin(currentThetaArray[1]*Math.PI/180),fg*Math.sin(currentThetaArray[2]*Math.PI/180)]
	// var angularAccelerationArray=[0,0,0];
	// var swingDirArray=["right","right","right"];
