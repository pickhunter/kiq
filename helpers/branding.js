var chalk = require('chalk');

module.exports = {
	show: () => {
		var colors = ['green', 'green', 'green', 'blue', 'blue', 'blue', 'white', 'gray'].reverse();

		var kiq = `

		888    d8P  d8b          
		888   d8P   Y8P          
		888  d8P                 
		888d88K     888  .d88888 
		8888888b    888 d88" 888 
		888  Y88b   888 888  888 
		888   Y88b  888 Y88b 888 
		888    Y88b 888  "Y88888 
		                     888 
		                     888 
		                     888 
			`;

		kiq.split('\n').forEach((line, index) => {
			console.log(chalk[colors[index % colors.length]](line));
		});
	}
};