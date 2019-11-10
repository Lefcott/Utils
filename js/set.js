/*game=[
	[-1,-1, 2],
	[ 3,-1,-1],
	[-1, 1,-1]
];
/*game=[
	[-1,-1, 2],
	[ 3,-1],
	[-1, -1,-1]
];
oldGame=getArray(game);
originalGame=getArray(game);*/
function arrayCompare(a1,a2){
	// Compara arrays con cualquier número
	// permitido de dimensiones:
	let result=true,aux;
	if(a1==undefined||a2==undefined){
		return false;
	}else{
		if(!Array.isArray(a1)||!Array.isArray(a2)){
			return false;
		}else{
			if(a1.length!=a2.length){
				return false;
			}
		}
	}
	for(let k=0;k<a1.length;k++){
		aux=Array.isArray(a1[k]);
		if(aux==Array.isArray(a2[k])){
			if(aux){
				result&=arrayCompare(a1[k],a2[k]);
			}else{
				result&=a1[k]==a2[k];
			}
		}else{
			return false;
		}
	}
	return result;
}
function getArray(a){
	let result=[],aux;
	for(let k=0;k<a.length;k++){
		aux=(Array.isArray(a[k]))?getArray(a[k]):a[k];
		result[k]=aux;
	}
	return result;
}