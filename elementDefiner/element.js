const element = {};

element.setStyle = function(elem, style, excludedKey) {
	const styleKeys = Object.keys(style);
	for (let k = 0; k < styleKeys.length; k++) {
		if (styleKeys[k] !== excludedKey) {
			elem.style[styleKeys[k]] = style[styleKeys[k]];
		}
	}
	return elem;
}

element.styleLoop = function(elem, newElem) {
	let wait = 0;
	const minWait = 5;
	for (let k = 0; k < elem.styles.length; k++)  {
		const styleObj = elem.styles[k];
		const transition = styleObj.transition || 0;
		const addedWait = transition ? minWait : 0;
		setTimeout(function() {
			if (transition > 0) {
				newElem.style.transition = (transition / 1000) + 's';
				setTimeout(function() {
					newElem = element.setStyle(newElem, styleObj.style, 'transition');
				}, addedWait);
			} else {
				newElem = element.setStyle(newElem, styleObj.style, 'transition');
			}
		}, wait);
		wait += transition + addedWait;
	}
	setTimeout(function() {
		newElem.style.transition = elem.styleTransition > 0 ? ((elem.styleTransition / 1000) + 's') : '';
	}, wait);
}

element.define = function(elem, parent) {
	// TODO make setPropsNow work
	// Keys: tag, props, styleFrom, style
	let newElem = document.createElement(elem.tag);
	newElem.innerHTML = elem.innerHTML || '';
	const propNames = Object.keys(elem.props);
	for (let k = 0; k < propNames.length; k++) {
		newElem.setAttribute(propNames[k], elem.props[propNames[k]]);
	}
	element.styleLoop(elem, newElem);
	if (parent) {
		parent.appendChild(newElem);
	}
	return newElem;
}
