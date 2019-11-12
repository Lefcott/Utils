function giveSolutions(GAME){
	posible=true;
	game=getArray(GAME);
	oldGame=getArray(GAME);
	originalGame=getArray(GAME);
	takenGame=[];
	loggedGames=[];
	loggedTaken=[];
	loggedOptions=[];
	totalSolutions=[];
	for(let a=0;a<game.length;a++){
		if(game[a]!=undefined){
			takenGame[a]=[];
			for(let b=0;b<game[a].length;b++){
				takenGame[a][b]=(game[a][b]>=0)?0:-1;
			}
		}
	}
	let keepDoing=true, isNotOk=!isOk();
	while(posible&&(keepDoing&&isNotOk||!isNotOk&&loggedOptions.length>0)){
		let dontSearch=false;
		//console.log("BUCLE");
		keepDoing=searchUnique()||combinate();
		isNotOk=!isOk();
		if(!isNotOk){
			putNums();
			//console.log("Solution game: "+JSON.stringify(game));
			totalSolutions[totalSolutions.length]=getArray(game);
			dontSearch=true;
		}
		// En caso de haber varias opciones disponibles,
		// se loggea el juego actual y 
		// todas las opciones posibles:
		if(!keepDoing&&posible&&isNotOk||!isNotOk){
			if(!dontSearch){
				//console.log("DESCUBRIR OPCIONES:");
				let currPosibles;
				for(let a=0;a<game.length;a++){
					for(let b=0;b<game[a].length;b++){
						currPosibles=posiblesForPos([a,b]);
						if(currPosibles.length>0){
							for(let k=0;k<currPosibles.length;k++){
								loggedOptions[loggedOptions.length]=[a,b].concat(currPosibles[k]);
								loggedGames[loggedGames.length]=getArray(game);
								loggedTaken[loggedTaken.length]=getArray(takenGame);
							}
						}
					}
				}
//console.log("Game:"+JSON.stringify(game));
//console.log("Options:"+JSON.stringify(loggedOptions));
//console.log("................");
			}
			// Trata de elegir una opción del último
			// conjunto de opciones descubierto:
			if(loggedOptions.length>0){
//console.log("ELEGIR LA "+(loggedOptions.length-1)+"° OPCION");
				// Simula la última situación del juego:
				let currOption=loggedOptions[loggedOptions.length-1];
				game=getArray(loggedGames[loggedGames.length-1]);
				takenGame=getArray(loggedTaken[loggedTaken.length-1]);

				// Ejecuta lo que dice la opción:
				game[currOption[0]][currOption[1]]=[currOption[2],currOption[3]];
				game[currOption[2]][currOption[3]]--;
				takenGame[currOption[2]][currOption[3]]++;

				keepDoing=true;
				lastCoords=[currOption[0],[currOption[1]]];
				lastCoordsFrom=[currOption[2],[currOption[3]]];
				lastSameRow=lastCoords[0]==lastCoordsFrom[0];
				lastSameCol=lastCoords[1]==lastCoordsFrom[1];
				markPath();
				oldGame=getArray(game);

				loggedOptions.pop();
				loggedGames.pop();
				loggedTaken.pop();
			}
			//console.log(JSON.stringify(loggedOptions,true));
		}
		isNotOk=!isOk();
	}
	//console.log("Solution/s: ");
	return (posible)?/*totalSolutions*/unique(totalSolutions):"It's not posible.";
}
function posiblesForPos(pos){
	let result=[];
	for(let a=0;a<game.length;a++){
		for(let b=0;b<game[a].length;b++){
			if(!(a==pos[0]&&b==pos[1])&&!Array.isArray(game[a][b])
							&&!Array.isArray(game[pos[0]][pos[1]])&&canBeFrom([pos[0],pos[1]],[a,b])){
				result[result.length]=[a,b];
			}
		}
	}
	return result;
}
function findOcIn(oc,In){
	// Es para arays de arrays, no
	// funciona con indexOf()
	for(let a=0;a<In.length;a++){
		if(arrayCompare(oc,In[a])){
			return a;
		}
	}
	return -1;
}
function unique(a){
	// Elimina elementos repetidos de cualquier array:
	for(let b=0;b<a.length-1;b++){
		for(let c=b+1;c<a.length;c++){
			if(arrayCompare(a[b],a[c])||a[b]==a[c]){
				//console.log("sa")
				a=delFromArr(a,c);
				b--;
				c--;
			}
		}
	}
	return a;
}
function delFromArr(a,k){
	for(let b=k;b<a.length-1;b++){
		a[b]=a[b+1];
	}
	a.pop();
	return a;
}