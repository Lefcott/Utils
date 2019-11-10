var posible=true;
function combinate(){
	let foundNum;
	for(let a=0;a<game.length;a++){
		for(let b=0;b<game[a].length;b++){
			//console.log("a:"+a+",b:"+b);
			for(let c=1;c<=4;c++){
				if(game[a][b]>0){
					foundNum=0;
					for(let d=1;d<=3;d++){
						//console.log("\t"+(c+d));
						foundNum+=quantForPosAtDir([a,b],c+d,true);
					}
					if(foundNum+quantForPosAtDir([a,b],c,true)<game[a][b]){
						//console.log(a+","+b+", IMPOSSIBLE TO COMBINATE "+JSON.stringify(game));
						posible=false;
						return false;
					}
					//console.log("\t\tfoundNum:"+foundNum);
					if(game[a][b]-foundNum>0){
						//console.log(JSON.stringify([a,b])+","+foundNum);
						//console.log("game["+a+"]["+b+"]:"+game[a][b]+",found:"+foundNum+",dir:"+c);
						fillAtPos([a,b],c,game[a][b]-foundNum);
					}
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
function fillAtPos(coords, dir, quant){
	dir%=4;
	let elem;
	for(let k=1;k<=quant;k++){
		switch(dir){
			case 1:
				if(game[coords[0]]!=undefined&&game[coords[0]][coords[1]+k]!=undefined){
					game[coords[0]][coords[1]+k]=coords;
					game[coords[0]][coords[1]]--;
					takenGame[coords[0]][coords[1]]++;
				}
				break;
			case 2:
				if(game[coords[0]-k]!=undefined&&game[coords[0]-k][coords[1]]!=undefined){
					game[coords[0]-k][coords[1]]=coords;
					game[coords[0]][coords[1]]--;
					takenGame[coords[0]][coords[1]]++;
				}
				break;
			case 3:
				if(game[coords[0]]!=undefined&&game[coords[0]][coords[1]-k]!=undefined){
					game[coords[0]][coords[1]-k]=coords;
					game[coords[0]][coords[1]]--;
					takenGame[coords[0]][coords[1]]++;
				}
				break;
			case 0:
				if(game[coords[0]+k]!=undefined&&game[coords[0]+k][coords[1]]!=undefined){
					game[coords[0]+k][coords[1]]=coords;
					game[coords[0]][coords[1]]--;
					takenGame[coords[0]][coords[1]]++;
				}
				break;
		}
	}
}
function putNums(){
	for(let a=0;a<game.length;a++){
		for(let b=0;b<game[a].length;b++){
			if(game[a][b]===0){
				game[a][b]=originalGame[a][b];
			}
		}
	}
}
function quantForPosAtDir(coords, dir, ET){
	// bool ET: buscar <true:empty><false:taken>
	// Em
	// dir: 1RIGHT, 2UP, 3LEFT, 4DOWN
	dir%=4;
	let quant=0;
	switch(dir){
		case 1:
			for(let k=coords[1]+1;k<game[coords[0]].length;k++){
				// Si se buscan casillas vacías y se encuentra una vacía o al revés:
				if((ET&&game[coords[0]][k]===-1)||(!ET&&arrayCompare(game[coords[0]][k],coords))){
					quant++;
				}else if(!arrayCompare(game[coords[0]][k],coords)){
					break;
				}
			}
			break;
		case 2:
			for(let k=coords[0]-1;k>=0;k--){
				if((ET&&game[k][coords[1]]===-1)||(!ET&&arrayCompare(game[k][coords[1]],coords))){
					quant++;
				}else if(!arrayCompare(game[k][coords[1]],coords)){
					break;
				}
			}
			break;
		case 3:
			for(let k=coords[1]-1;k>=0;k--){
				if((ET&&game[coords[0]][k]===-1)||(!ET&&arrayCompare(game[coords[0]][k],coords))){
					quant++;
				}else if(!arrayCompare(game[coords[0]][k],coords)){
					break;
				}
			}
			break;
		case 0:
			for(let k=coords[0]+1;k<game.length;k++){
				if((ET&&game[k][coords[1]]===-1)||(!ET&&arrayCompare(game[k][coords[1]],coords))){
					quant++;
				}else if(!arrayCompare(game[k][coords[1]],coords)){
					break;
				}
			}
			break;
	}
	return quant;
}
function isOk(){
	let result=true;
	for(let k=0;k<game.length;k++){
		for(let m=0;m<game[0].length;m++){
			result&=game[k][m]!=-1;
		}
	}
	return result;
}