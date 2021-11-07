window.onload = () => {
	const images = document.querySelectorAll('img[usemap]');
	images.forEach(image => {
		console.log(image.naturalWidth, image.naturalHeight);
		const mapId = image.getAttribute('usemap').substr(1);
		const imageWidth = image.naturalWidth;
		const imageHeight = image.naturalHeight;
		const imageMap = document.querySelector(`map[name="${mapId}"]`);
		const areas = imageMap.querySelectorAll('area');

		image.removeAttribute('usemap');
		imageMap.remove();

		// create wrapper container
		const wrapper = document.createElement('div');
		wrapper.classList.add('imagemap');
		image.parentNode.insertBefore(wrapper, image);
		wrapper.appendChild(image);

		areas.forEach(area => {
			const coords = area.getAttribute('coords').split(',');
			let x = [parseInt(coords[0]), parseInt(coords[2])];
			let y = [parseInt(coords[1]), parseInt(coords[3])];
			x = x.sort((a, b) => a - b);
			y = y.sort((a, b) => a - b);
			console.log(x, y, imageWidth, imageHeight);
			const left = ((x[0] / imageWidth) * 100).toFixed(2);
			const top = ((y[0] / imageHeight) * 100).toFixed(2);
			const width = (((x[1] - x[0]) / imageWidth) * 100).toFixed(2);
			const height = (((y[1] - y[0]) / imageHeight) * 100).toFixed(2);
			const style = `left: ${left}%; top: ${top}%; width: ${width}%; height: ${height}%;`;
			wrapper.innerHTML += `<a href="${area.getAttribute('href')}" title="${area.getAttribute('title')}" class="area" style="${style}"></a>`;

		});
	});
};
