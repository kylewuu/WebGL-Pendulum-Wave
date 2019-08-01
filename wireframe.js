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

  var cable=[
    vec3(0,12,-0.5),
    vec3(0,0,-0.5)
  ]
