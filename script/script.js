const colors = ["#C62828", "#607D8B", "#9C27B0", "#3949AB", "#AEEA00", "#18FFFF", "#4CAF50", "#FFB300", "#795548", "#212121"]; //Colori utilizzati per i data-cases

const svg = d3.select('svg');

const maxValue = 500;
const radius = 300;
const center = {
	x: 450,
	y: 350
};

const radialScale = d3.scaleLinear()
	.domain([0, maxValue])
	.range([radius, 0])

const axis = d3.axisRight()
	.scale(radialScale)
	.ticks(5)

svg.append('g')
	.style('pointer-events', 'none')
	.attr('transform', `translate(${center.x},${center.y  - radius})`)
	.call(axis);

let val, angle;

// Disegno la griglia circolare sottostante il diagramma
for (val = 0; val <= maxValue; val += maxValue / 5) {
	const r = radialScale(val);
	svg.append('circle')
		.style('pointer-events', 'none')
		.attr('cx', center.x)
		.attr('cy', center.y)
		.attr('r', r)
		.style('stroke', '#aaa')
		.style('fill', 'none');
}

const labels = ['Tecnica', 'Potenza', 'Movimento', 'Precisione', 'Stile offensivo'];

const shifts = [{x: 0, y: -10}, {x: 5, y: 5}, {x: 5, y: 15}, {x: -70, y: 15}, {x: -120,	y: 5}];

// Disegno gli assi a partire dal centro e inserisco la descrizione della variabile
for (let index = 0; index < labels.length; index++) {
	const angle = index * Math.PI * 2 / labels.length;
	const x = center.x + radius * Math.sin(angle);
	const y = center.y + radius * -Math.cos(angle);
	if (angle > 0) {
		svg.append('line')
			.attr('x1', center.x)
			.attr('y1', center.y)
			.attr('x2', x)
			.attr('y2', y)
			.style('pointer-events', 'none')
			.style('stroke', '#000');

	}
	svg.append('text')
		.text(labels[index])
		.attr("font-family", "Lucida Sans")
		.attr('dx', shifts[index].x)
		.attr('dy', shifts[index].y)
		.attr('x', x)
		.attr('y', y)
}


var tempPathColor;

//Funzione che gestisce l'evento di click su uno dei punti del diagramma o sul nome di un calciatore nella legenda
function onClickEvent(d, i) {
	let idPoint = "#" + d3.select(this).attr('id'); // id del punto o del nome cliccato
	let index = idPoint.substr(idPoint.length - 1); // estraggo l'indice i
	
	let idPath = "#path" + index; // identifico il path relativo al punto/nome
	tempPathColor = d3.select(idPath).style("stroke"); // colore del poligono
	console.log("Color: " + tempPathColor + " - Path: " + idPath);
	
	//seleziono il path e gestisco la transition colorando il poligono per qualche secondo
	d3.select(idPath)
		.transition()
		.duration(1500)
		.style("fill", tempPathColor)
		.style('stroke-opacity', 0.8)
		.transition()
		.delay(1000)
		.duration(2000)
		.style("fill", "transparent")
		.style('stroke-opacity', 0.3);
}

// Prendo i dati di input dal file data.json
d3.json("data/data.json").then(function(d) {
	keys = Object.keys(d); // chiavi del dataset
	data = Object.values(d); // dati
	
	//Viene gestito ogni oggetto del dataset
	for (let i = 0; i < data.length; i++) {
		let path = '';
		var element = Object.values(data[i]);
		//Viene gestito il singolo data-case
		for (let j = 0; j < element.length; j++) {
			const r = radius - radialScale(element[j]);
			const angle = j * Math.PI * 2 / element.length;
			const x = center.x + r * Math.sin(angle);
			const y = center.y + r * -Math.cos(angle);
			path += `${j > 0 ? 'L' : 'M'} ${x},${y} `; //M=Move to, L=Line to
			// Disegno i punti corrispondenti ai valori del data-case
			svg.append("circle")
				.attr("class", "points")
				.attr("id", "point" + j + "-" + i)
				.attr("cx", x)
				.attr("cy", y)
				.attr("fill", colors[i])
				.attr('fill-opacity', 0.6)
				.attr("stroke", "black")
				.on("click", onClickEvent) //Gestione del click sul punto
				.on("mouseover", function() {d3.select(this).transition().style("cursor", "pointer").attr("r", 11).attr("fill-opacity", 0.9)}) //Al passaggio del mouse ingrandisco il punto al passaggio del mouse
				.on("mouseout", function() {d3.select(this).transition().style("cursor", "default").attr("r", 4).attr("fill-opacity", 0.6)}) //Riporto alla situazione di partenza
				.attr("r", 4);

		}
		path += 'Z'; //Chiudo il path
		console.log(path);
		// Disegno il poligono relativo al data-case
		svg.append('path')
			.attr("class", "paths")
			.attr("id", "path" + i)
			.attr('d', path)
			.style('pointer-events', 'none')
			.style('stroke', colors[i])
			.style('stroke-width', 3)
			.style('stroke-opacity', 0.3)
			.style('fill', "transparent")
			.style('fill-opacity', 0.6)
	}
	
	//Creo la legenda
	
	//Imposto il titolo della legenda
	var text = svg.append("text")
		.attr("class", "title")
		.attr('transform', 'translate(90,0)')
		.attr("x", 750)
		.attr("y", 20)
		.attr("font-size", "14px")
		.attr("font-family", "Lucida Sans")
		.attr("fill", "black")
		.text("VALUTAZIONE CALCIATORI OFFENSIVI ITALIANI");

	var legend = svg.append("g")
		.attr("class", "legend")
		.attr("height", 100)
		.attr("width", 200)
		.attr('transform', 'translate(90,40)')

	;
	//Creo un quadrato con il colore associato al calciatore
	legend.selectAll('rect')
		.data(keys)
		.enter()
		.append("rect")
		.attr("x", 750)
		.attr("y", function(d, i) {
			return i * 20;
		})
		.attr("width", 10)
		.attr("height", 10)
		.style("fill", function(d, i) {
			return colors[i];
		});
	
	//Inserisco il nome del calciatore nella legenda
	legend.selectAll('text')
		.data(keys)
		.enter()
		.append("text")
		.attr("class", "legend")
		.attr("id", "element" + keys.indexOf(function(d, i) {
			return i;
		}))
		.attr("id", function(d, i) {
			return "element" + i;
		})
		.attr("x", 767)
		.attr("y", function(d, i) {
			return i * 20 + 9;
		})
		.attr("font-size", "11px")
		.attr("font-family", "Lucida Sans")
		.attr("fill", "black")
		.text(function(d) {
			return d;
		})
		.on("click", onClickEvent) //Gestisco il click sul nome del calciatore, colorando il poligono associato
		.on("mouseover", function() {d3.select(this).transition().style("cursor", "pointer").attr("font-size", "13px")}) // Al passaggio del mouse ingrandisco il nome del calciatore
		.on("mouseout", function() {d3.select(this).transition().style("cursor", "default").attr("font-size", "11px")}); // Riporto alla situazione di partenza


}).catch(function(error) {
	console.log(error)
});