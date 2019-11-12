let preGame = [], clickedToken = "none", normalColor = "#DEF", selectedColor = "#AAA";
let oldInerHTML = "";
let tokenSize = 39.5;
let innerSep = 10;
let outerSep = 10;
let gameSize = [4, 4];
function createGame(gameWidth, gameHeight){
	preGame = [];
	document.getElementById("size").innerHTML = gameWidth + "X" + gameHeight;
	if(document.getElementById("gameContainer")){
		document.body.removeChild(document.getElementById("gameContainer"));
	}
	let gameContainer = document.createElement("div");
	gameContainer.id = "gameContainer";
	gameContainer.style.width = (gameWidth * tokenSize + (gameWidth - 1) * innerSep + 2 * outerSep) + "px";
	gameContainer.style.height = (gameHeight * tokenSize + (gameHeight - 1) * innerSep + 2 * outerSep) + "px";
	for(let k = 0; k < gameHeight; k++){
		preGame[k] = [];
		for(let m = 0; m < gameWidth; m++){
			preGame[k][m] = -1;
			let token = document.createElement("div");
			token.id = k + "_" + m;
			token.setAttribute("class", "token");
			token.setAttribute("onclick", "clickToken(event);");
			token.style.left = (outerSep + m * (tokenSize + innerSep)) + "px";
			token.style.top = (outerSep + k * (tokenSize + innerSep)) + "px";
			token.style.width = tokenSize + "px";
			token.style.height = tokenSize + "px";
			token.style.backgroundColor = normalColor;
			gameContainer.appendChild(token);
		}
	}
	let up = document.createElement("div");
	up.setAttribute("class", "button");
	up.setAttribute("onclick", "changeSize([0, -1]);");
	up.innerHTML = "&uarr;";
	gameContainer.appendChild(up);
	let down = document.createElement("div");
	down.setAttribute("class", "button");
	down.setAttribute("onclick", "changeSize([0, 1]);");
	down.innerHTML = "&darr;";
	down.style.transform = "translate(0, 100%)";
	gameContainer.appendChild(down);
	let left = document.createElement("div");
	left.setAttribute("class", "button");
	left.setAttribute("onclick", "changeSize([-1, 0]);");
	left.innerHTML = "&larr;";
	left.style.left = "100%";
	left.style.top = 0;
	left.style.width = "25px";
	left.style.height = "100%";
	gameContainer.appendChild(left);
	let right = document.createElement("div");
	right.setAttribute("class", "button");
	right.setAttribute("onclick", "changeSize([1, 0]);");
	right.innerHTML = "&rarr;";
	right.style.left = "100%";
	right.style.top = 0;
	right.style.width = "25px";
	right.style.height = "100%";
	right.style.transform = "translate(100%, 0)";
	gameContainer.appendChild(right);
	let show = document.createElement("div");
	show.setAttribute("class", "button");
	show.setAttribute("onclick", "showSolution();");
	show.style.transform = "translate(0, 200%)";
	show.innerHTML = "Show solution";
	gameContainer.appendChild(show);
	document.body.appendChild(gameContainer);
}
function changeSize(change){
	let changed = false;
	if(gameSize[0] + change[0] > 0){
		gameSize[0] =  gameSize[0] + change[0];
		changed = true;
	}
	if(gameSize[1] + change[1] > 0){
		gameSize[1] =  gameSize[1] + change[1];
		changed = true;
	}
	if(changed){
		createGame(gameSize[0], gameSize[1]);
	}
}
function clickToken(e){
	if(clickedToken == e.target.id){
		noClickToken(e.target);
		return true;
	}else{
		if(document.getElementById(clickedToken)){
			noClickToken(document.getElementById(clickedToken));
		}
	}
	oldInerHTML = e.target.innerHTML;
	e.target.style.backgroundColor = selectedColor;
	clickedToken = e.target.id;
}
function noClickToken(token){
	token.style.backgroundColor = normalColor;
	clickedToken = "none";
}
function writeToken(e){
	let token = document.getElementById(clickedToken);
	if(!token){
		return false;
	}
	let coords = clickedToken.split("_");
	coords[0] = parseInt(coords[0]);
	coords[1] = parseInt(coords[1]);
	if(e.keyCode == 27){
		if(document.getElementById(clickedToken)){
			token.innerHTML = oldInerHTML;
			preGame[coords[0]][coords[1]] = token.innerHTML == "" ? -1 : parseInt(token.innerHTML);
			noClickToken(token);
		}
	}
	if(e.keyCode == 13){
		if(document.getElementById(clickedToken)){
			noClickToken(document.getElementById(clickedToken));
		}
		return true;
	}
	if(isNaN(parseInt(e.key)) && e.keyCode != 8){
		return false;
	}
	if(e.keyCode == 8){
		token.innerHTML = token.innerHTML.substring(0, token.innerHTML.length - 1);
	}else{
		token.innerHTML += e.key;
	}
	preGame[coords[0]][coords[1]] = token.innerHTML == "" ? -1 : parseInt(token.innerHTML);
}
function showSolution(){
	let rayBorder = 15;
	let solution = giveSolutions(preGame)[0];
	let gameContainer = document.getElementById("gameContainer");
	let rays = document.getElementsByClassName("ray");
	while(rays.length > 0){
		gameContainer.removeChild(rays[0]);
	}
	for(let k = 0; k < solution.length; k++){
		for(let m = 0; m < solution[k].length; m++){
			if(Array.isArray(solution[k][m])){
				if(solution[k][m][0] == k){
					let minX = Math.min(solution[k][m][1], m);
					let ray = document.createElement("div");
					ray.setAttribute("class", "ray");
					ray.style.transform = "translate(0, -50%)";
					ray.style.height = rayBorder + "px";
					ray.style.left = (outerSep + minX * (tokenSize + innerSep) + tokenSize * 0.8) + "px";
					if(solution[k][m][1] > m){
						ray.style.left = (parseInt(ray.style.left) - tokenSize * 0.55) + "px";
					}
					ray.style.top = (outerSep + k * (tokenSize + innerSep) + tokenSize / 2) + "px";
					ray.style.width = 0;
					ray.style.opacity = 0;
					ray.style.transition = "0.8s";
					window.setTimeout(function(){
						ray.style.opacity = 1;
						ray.style.width = (Math.abs(solution[k][m][1] - m) * (tokenSize + innerSep)) + "px";
					}, 5);
					gameContainer.appendChild(ray);
				}else{
					let minY = Math.min(solution[k][m][0], k);
					let ray = document.createElement("div");
					ray.setAttribute("class", "ray");
					ray.style.transform = "translate(-50%, 0)";
					ray.style.width = rayBorder + "px";
					ray.style.top = (outerSep + minY * (tokenSize + innerSep) + tokenSize * 0.9) + "px";
					if(solution[k][m][0] > k){
						ray.style.top = (parseInt(ray.style.top) - tokenSize * 0.8) + "px";
					}
					ray.style.left = (outerSep + m * (tokenSize + innerSep) + tokenSize / 2) + "px";
					ray.style.height = 0;
					ray.style.opacity = 0;
					ray.style.transition = "0.8s";
					window.setTimeout(function(){
						ray.style.opacity = 1;
						ray.style.height = (Math.abs(solution[k][m][0] - k) * (tokenSize + innerSep)) + "px";
					}, 5);
					gameContainer.appendChild(ray);
				}
			}
		}
	}
}
createGame(gameSize[0], gameSize[1]);