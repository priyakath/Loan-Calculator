document.getElementById("loan-input").addEventListener('submit', function(e) {
	document.querySelector("#results").style.display = "none"
	document.querySelector("#spinner").style.display = "block"

	setTimeout(getValues, 1000)
	e.preventDefault()
})

function getValues() {
	const amount = document.getElementById('amount')
	const interest = document.getElementById('interest')
	const years = document.getElementById('years')
	const monthly = document.getElementById('monthly')
	const total = document.getElementById('total-payment')
	const fullinter = document.getElementById('total-interest')

	const principal = parseFloat(amount.value)
	const calInterest = parseFloat(interest.value) / 100 / 12
	const calPayment = parseFloat(years.value) * 12

	const x = Math.pow(1+calInterest, calPayment)
	const monthCal = (principal*x*calInterest)/(x-1);

	if (isFinite(monthCal)) {
		monthly.value = monthCal.toFixed(2)
		total.value = (monthCal*calPayment).toFixed(2)
		fullinter.value = (total.value - principal).toFixed(2)
		
		document.querySelector('#results').style.display = "block"
		document.querySelector('#spinner').style.display = "none"
	}

	else {
		showError("Please check your numbers")
	}
}

function showError(e) {
	document.querySelector('#results').style.display = "none"
	document.querySelector('#spinner').style.display = "none"

	const errorDiv = document.createElement("div")

	errorDiv.className = "alert alert-warning"
	errorDiv.appendChild(document.createTextNode(e))

	const card = document.querySelector(".card")
	const heading = document.querySelector(".heading")

	card.insertBefore(errorDiv, heading)
	setTimeout(clearError, 3000)
}

function clearError() {
	document.querySelector('.alert').remove()
}