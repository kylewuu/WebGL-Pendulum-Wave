function pendulumRender(cableI,modelMI,cableMI){
	gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
	// gl.bindBuffer(gl.ARRAY_BUFFER, iBuffer);
	// gl.bindBuffer(gl.ARRAY_BUFFER, fBuffer);
	gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
	// gl.enableVertexAttribArray( vPosition );
	// var matrixuniformLocations= gl.getUniformLocation(program, 'matrix')
	// gl.uniformMatrix4fv(matrixuniformLocations,false,matrix);
	gl.uniformMatrix4fv(gl.getUniformLocation(program, 'modelM'),false,flatten(modelMI));
	gl.uniformMatrix4fv(gl.getUniformLocation(program, 'viewM'),false,flatten(viewM));
	gl.uniformMatrix4fv(gl.getUniformLocation(program, 'projectionM'),false,flatten(projectionM));
	gl.drawElements( gl.TRIANGLES, faces.length*3,gl.UNSIGNED_SHORT,faces);
	//
	gl.bindBuffer(gl.ARRAY_BUFFER,cBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(cableI),gl.STATIC_DRAW);
	gl.vertexAttribPointer( vPositionCube, 3, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPositionCube );
	// var matrixuniformLocationsCube= gl.getUniformLocation(program, 'matrix')
	// gl.uniformMatrix4fv(matrixuniformLocationsCube,false,cubematrix);
	gl.uniformMatrix4fv(gl.getUniformLocation(program, 'modelM'),false,flatten(cableMI));
	// gl.uniformMatrix4fv(gl.getUniformLocation(program, 'viewM'),false,flatten(viewM));
	// gl.uniformMatrix4fv(gl.getUniformLocation(program, 'projectionM'),false,flatten(projectionM));
	gl.drawArrays(gl.LINE_STRIP, 0, cable.length );
}
