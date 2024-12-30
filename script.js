const fares = {
	"batangas": 200,
	"calamba": 150,
	"lipa": 180
};
let selectedSeats = [];

const seatGrid = document.getElementById('seatGrid');
const selectedSeatsText = document.getElementById('selectedSeats');

function renderSeatGrid() {
	seatGrid.innerHTML = '';
	for (let row = 0; row < 8; row++) {
    	const rowDiv = document.createElement('div');
    	rowDiv.className = 'row';
    	for (let seat = 1; seat <= 4; seat++) {
        	const seatNumber = row * 4 + seat;
        	const seatButton = document.createElement('button');
        	seatButton.className = 'seat';
        	if (reservedSeats.includes(seatNumber)) {
            	seatButton.classList.add('reserved');
            	seatButton.disabled = true;
            	seatButton.textContent = ${seatNumber};
        	} else {
            	seatButton.addEventListener('click', () => selectSeat(seatNumber));
            	seatButton.textContent = ${seatNumber};
        	}
        	rowDiv.appendChild(seatButton);
    	}
    	seatGrid.appendChild(rowDiv);
	}
	const row9Div = document.createElement('div');
	row9Div.className = 'row';
	for (let seat = 33; seat <= 36; seat++) {
    	const seatButton = document.createElement('button');
    	seatButton.className = 'seat';
    	if (reservedSeats.includes(seat)) {
        	seatButton.classList.add('reserved');
        	seatButton.disabled = true;
        	seatButton.textContent = ${seat};
    	} else {
        	seatButton.addEventListener('click', () => selectSeat(seat));
        	seatButton.textContent = ${seat};
    	}
    	row9Div.appendChild(seatButton);
	}
	seatGrid.appendChild(row9Div);
	const row10Div = document.createElement('div');
	row10Div.className = 'row';
	for (let seat = 37; seat <= 40; seat++) {
    	const seatButton = document.createElement('button');
    	seatButton.className = 'seat';
    	if (reservedSeats.includes(seat)) {
        	seatButton.classList.add('reserved');
        	seatButton.disabled = true;
        	seatButton.textContent = ${seat};
    	} else {
        	seatButton.addEventListener('click', () => selectSeat(seat));
        	seatButton.textContent = ${seat};
    	}
    	row10Div.appendChild(seatButton);
	}
	seatGrid.appendChild(row10Div);
	const row11Div = document.createElement('div');
	row11Div.className = 'row';
	for (let seat = 41; seat <= 45; seat++) {
    	const seatButton = document.createElement('button');
    	seatButton.className = 'seat';
    	if (reservedSeats.includes(seat)) {
        	seatButton.classList.add('reserved');
        	seatButton.disabled = true;
        	seatButton.textContent = ${seat};
    	} else {
        	seatButton.addEventListener('click', () => selectSeat(seat));
        	seatButton.textContent = ${seat};
    	}
    	row11Div.appendChild(seatButton);
	}
    seatGrid.appendChild(row11Div);
}
function selectSeat(seatNumber) {
	if (selectedSeats.includes(seatNumber)) {
    	selectedSeats = selectedSeats.filter(seat => seat !== seatNumber);
	} else {
    	selectedSeats.push(seatNumber);
	}
	updateSelectedSeatsText();
	renderSeatGrid();
	updateFareDisplay();
}


