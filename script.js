const fares = {
	"batangas": 200,
	"calamba": 150,
	"lipa": 180
	};
	let selectedSeats = [];
	let reservedSeats = JSON.parse(localStorage.getItem('reservedSeats')) || [];
	const seatGrid = document.getElementById('seatGrid');
	const selectedSeatsText = document.getElementById('selectedSeats');
	const fareDisplay = document.getElementById('fareDisplay');
	const ticketDetails = document.getElementById('ticketDetails');
	const reserveButton = document.getElementById('reserveButton');
	let busCount = 1; // Track which bus we're on
	function renderSeatGrid() {
	seatGrid.innerHTML = '';
	let allSeatsTaken = true; // Flag to track if all seats are taken
	// Loop to create seat grid (1-45 seats)
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
	seatButton.textContent = `${seatNumber}`;
	} else {
	seatButton.addEventListener('click', () => selectSeat(seatNumber));
	seatButton.textContent = `${seatNumber}`;
	allSeatsTaken = false; // Found at least one seat that is not reserved
	}
	rowDiv.appendChild(seatButton);
	}
	seatGrid.appendChild(rowDiv);
	}
	for (let seat of [[33, 36], [37, 40], [41, 45]]) {
	const rowDiv = document.createElement('div');
	rowDiv.className = 'row';
	for (let i = seat[0]; i <= seat[1]; i++) {
	const seatButton = document.createElement('button');
	seatButton.className = 'seat';
	if (reservedSeats.includes(i)) {
	seatButton.classList.add('reserved');
	seatButton.disabled = true;
	seatButton.textContent = `${i}`;
	} else {
	seatButton.addEventListener('click', () => selectSeat(i));
	seatButton.textContent = `${i}`;
	allSeatsTaken = false; // Found at least one seat that is not reserved
	}
	rowDiv.appendChild(seatButton);
	}
	seatGrid.appendChild(rowDiv);
	}
	// Check if all seats are selected (1-45)
	if (allSeatsTaken) {
	reserveButton.textContent = "Next Bus"; // Change button text when all seats are reserved
	} else {
	reserveButton.textContent = "Reserve Seats"; // Default button text if seats are available
	}
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
	function updateSelectedSeatsText() {
	selectedSeatsText.textContent = `Selected Seats: ${selectedSeats.join(', ')}`;
	}
	function updateFareDisplay() {
	const terminal = document.getElementById('terminalSelect').value;
	const totalFare = fares[terminal] * selectedSeats.length;
	fareDisplay.textContent = `Total Fare: ₱${totalFare}`;
	}
	function reserveTicket() {
	if (reserveButton.textContent === "Next Bus") {
	// Reset for the next bus
	selectedSeats = [];
	reservedSeats = []; // Clear reserved seats for the next bus
	localStorage.setItem('reservedSeats', JSON.stringify(reservedSeats));
	renderSeatGrid();
	// Clear user details and reset button
	document.getElementById('name').value = '';
	document.getElementById('surname').value = '';
	document.getElementById('terminalSelect').selectedIndex = 0;
	document.getElementById('paymentSelect').selectedIndex = 0;
	selectedSeatsText.textContent = "Selected Seats: ";
	fareDisplay.textContent = "Total Fare: ₱0";
	ticketDetails.innerHTML = '';
	// Change button text to "Reserve Seats"
	reserveButton.textContent = "Reserve Seats";
	} else {
	// Reserve seats if the button is "Reserve Seats"
	const name = document.getElementById('name').value;
	const surname = document.getElementById('surname').value;
	if (!name || !surname || selectedSeats.length === 0) {
	alert('Please provide your name and select at least one seat.');
	return;
	}
    reservedSeats = reservedSeats.concat(selectedSeats);
    localStorage.setItem('reservedSeats', JSON.stringify(reservedSeats));
    const terminal = document.getElementById('terminalSelect').value;
    const paymentMethod = document.getElementById('paymentSelect').value;
    const ticketID = 'TICKET-' + Math.floor(Math.random() * 100000);
    const ticket = `
    <div class="ticketDetails">
    <div class="ticketHeader">Ticket ID: ${ticketID}</div>
    <div>Name: ${name} ${surname}</div>
    <div>Terminal: ${terminal.charAt(0).toUpperCase() + terminal.slice(1)} SM Terminal</div>
    <div>Seats: ${selectedSeats.join(', ')}</div>
    <div>Payment Method: ${paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)}</div>
    <div>Fare: ₱${fares[terminal] * selectedSeats.length}</div>
    </div>
    <div class="reservedSeatText">Have a safe trip!</div>
    `;
    ticketDetails.innerHTML = ticket;
    selectedSeats = [];
    renderSeatGrid();
    updateSelectedSeatsText();
    updateFareDisplay();
    // Clear user details automatically after reservation
    document.getElementById('name').value = '';
    document.getElementById('surname').value = '';
    document.getElementById('terminalSelect').selectedIndex = 0;
    document.getElementById('paymentSelect').selectedIndex = 0;
    }
    }
    reserveButton.addEventListener('click', reserveTicket);
    renderSeatGrid(); 
