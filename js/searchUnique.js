var lastCoords=[],lastCoordsFrom=[],lastSameRow=false,lastSameCol=false;
function searchUnique(){
	let sumTotal=0;
	for(let k=0;k<game.length;k++){
		for(let m=0;m<game[k].length;m++){
			if(game[k][m]==-1){
				let total=[];
				for(let a=0;a<game.length;a++){
					for(let b=0;b<game[a].length;b++){
						total[total.length]=!(k==a&&m==b)&&game[k][m]==-1&&game[a][b][0]==undefined&&canBeFrom([k,m],[a,b]);
					}
				}
				sumTotal=sum(total);
				// Si un [k,m] puede pertenecer solo a un [a,b]:
				if(sumTotal==1){
					//console.log("searchUnique game:" + JSON.stringify(game));
					//console.log(k+","+m+" pertenece a "+JSON.stringify(lastCoordsFrom));
					//console.log(canBeFrom([k,m],[0,0]));
					game[k][m]=lastCoordsFrom;
					game[lastCoordsFrom[0]][lastCoordsFrom[1]]--;
					takenGame[lastCoordsFrom[0]][lastCoordsFrom[1]]++;

					markPath();
				}else if(sumTotal==0){
					//console.log("CBF: "+canBeFrom([0,3],[0,0]));
					//console.log("game: "+JSON.stringify(game));
					//console.log("takenGame: "+JSON.stringify(takenGame));
					//console.log("IMPOSSIBLE TO SEARCH UNIQUE ON "+k+","+m);
					posible=false;
					return false;
				}
			}
		}
	}
	let keepDoingThis=!arrayCompare(game,oldGame);
	// Si hago oldGame=game, cada cambio que
	// se haga en uno se hace en el otro.
	oldGame=getArray(game);
	return keepDoingThis;
}
function canBeFrom(coords, coordsFrom){//row:y,col:x
	var sameRow=coords[0]==coordsFrom[0];
	var sameCol=coords[1]==coordsFrom[1];
	if(	coords[0]>=game.length||
		coords[1]>=game[coords[0]].length||
		coordsFrom[0]>=game.length||
		coordsFrom[1]>=game[coordsFrom[0]].length||
		sameRow==sameCol||
		(game[coords[0]][coords[1]]!=-1&&!arrayCompare(game[coords[0]][coords[1]],coordsFrom))||
		game[coordsFrom[0]][coordsFrom[1]]<=0){
		return false;
	}else{
		let result=true;
		if(sameRow){
			if(Math.abs(coords[1]-firstFromAtPos(coordsFrom,coords))>game[coordsFrom[0]][coordsFrom[1]]){
				if(arrayCompare(coords,[0,3])&&arrayCompare(coordsFrom,[0,0])){
					//console.log("game: "+JSON.stringify(game));
					//console.log("FFAtPos "+JSON.stringify(coordsFrom)+","+
					//	JSON.stringify(coords)+": "+firstFromAtPos(coordsFrom,coords));
				}
				return false;
			}else{
				let min=Math.min(coords[1], coordsFrom[1]);
				let max=Math.max(coords[1], coordsFrom[1]);
				for(let k=min+1;k<max;k++){
					//console.log(k)
					result&=game[coordsFrom[0]][k]==-1||arrayCompare(game[coordsFrom[0]][k],coordsFrom);
					//console.log(result);
					//console.log(game[coordsFrom[0]][k])
				}
			}
		}else{//sameCol
			/*console.log(Math.abs(coords[0]-firstFromAtPos(coordsFrom,coords))+","+
				(game[coordsFrom[0]][coordsFrom[1]]-
				takenGame[coordsFrom[0]][coordsFrom[1]]));*/
			if(Math.abs(coords[0]-firstFromAtPos(coordsFrom,coords))>game[coordsFrom[0]][coordsFrom[1]]){
				return false;
			}else{
				let min=Math.min(coords[0], coordsFrom[0]);
				let max=Math.max(coords[0], coordsFrom[0]);
				for(let k=min+1;k<max;k++){
					result&=game[k][coordsFrom[1]]==-1||arrayCompare(game[k][coordsFrom[1]],coordsFrom);
				}
			}
		}
		if(result){
			lastCoords=coords;
			lastCoordsFrom=coordsFrom;
			lastSameRow=sameRow;
			lastSameCol=sameCol;
			return true;
		}else{
			return false
		}
	}
}
function sum(vector){
	let result=0;
	for(let k=0;k<vector.length;k++){
		result+=vector[k];
	}
	return result;
}
function markPath(){
	if(lastSameRow){
		let min=Math.min(lastCoords[1], lastCoordsFrom[1]);
		let max=Math.max(lastCoords[1], lastCoordsFrom[1]);
		for(let a=min+1;a<max;a++){
			if(game[lastCoordsFrom[0]][a]==-1){
				game[lastCoordsFrom[0]][a]=lastCoordsFrom;
				game[lastCoordsFrom[0]][lastCoordsFrom[1]]--;
				takenGame[lastCoordsFrom[0]][lastCoordsFrom[1]]++;
			}
		}
	}else{
		let min=Math.min(lastCoords[0], lastCoordsFrom[0]);
		let max=Math.max(lastCoords[0], lastCoordsFrom[0]);
		for(let a=min+1;a<max;a++){
			if(game[a][lastCoordsFrom[1]]==-1){
				game[a][lastCoordsFrom[1]]=lastCoordsFrom;
				game[lastCoordsFrom[0]][lastCoordsFrom[1]]--;
				takenGame[lastCoordsFrom[0]][lastCoordsFrom[1]]++;
			}
		}
	}
}
function firstFromAtPos(from, pos){
	// Encuentra la primer celda que
	// pertenece a from desde la celda pos.
	// Si están en la misma columna
	// devuelve el valor de la fila.
	let sameRow=from[0]==pos[0];
	let sameCol=from[1]==pos[1];
	let result,minDif=Infinity,currDif=0;
	if(sameRow){
		let min=Math.min(pos[1], from[1]);
		let max=Math.max(pos[1], from[1]);
		result=from[1];
		for(let k=min+1;k<max;k++){
			if(arrayCompare(game[pos[0]][k],from)){
				currDif=Math.abs(pos[1]-k);
				if(currDif<minDif){
					minDif=currDif;
					result=k;
				}
			}
		}
	}else{
		let min=Math.min(pos[0], from[0]);
		let max=Math.max(pos[0], from[0]);
		result=from[0];
		for(let k=min+1;k<max;k++){
			if(arrayCompare(game[k][pos[1]],from)){
				currDif=Math.abs(pos[0]-k);
				if(currDif<minDif){
					minDif=currDif;
					result=k;
				}
			}
		}
	}
	return result;
}