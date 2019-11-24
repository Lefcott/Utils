const a = element.define({
	tag: 'div',
	innerHTML: 'Test',
	props: {
		onclick: 'console.log(\'Clicked the square\')'
	},
	styleTransition: 3000,
	styles: [
		{
			style: {
				background: '#DDD',
				width: '128px',
				height: '128px',
				transition: '1s',
				textAlign: 'center',
				fontSize: '19px'
			}
		},
		{
			transition: 500,
			style: {
				position: 'absolute',
				transform: 'translate(-50%, -50%)',
				left: '50%',
				top: '50%',
				cursor: 'pointer',
				background: '#123',
				color: '#EDC',
				width: '64px',
				height: '64px',
				textAlign: 'left'
			}
		},
		{
			transition: 500,
			style: {
				background: '#4AF',
				color: '#B50',
				width: '80px',
				height: '40px',
				textAlign: 'right'
			}
		},
		{
			transition: 500,
			style: {
				background: '#6F4',
				color: '#90b',
				width: '40px',
				height: '90px',
				textAlign: 'left'
			}
		},
		{
			transition: 500,
			style: {
				background: '#F56',
				color: '#FFF',
				width: '80%',
				height: '80%',
				textAlign: 'center',
				fontSize: '34px',
				textShadow: '0 0 15px'
			}
		}
	]
}, document.body);