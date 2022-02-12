const hexToDec = (hexValue) => {
	const len = hexValue.length;

	// Initializing base value to 1, i.e 16^0
	let base = 1;

	let decValue = 0;

	// Extracting characters as digits from last
	// character
	for (let i = len - 1; i >= 0; i--) {
		// if character lies in '0'-'9', converting
		// it to integral 0-9 by subtracting 48 from
		// ASCII value
		if (hexValue.charAt(i) >= '0'
			&& hexValue.charAt(i) <= '9') {
			decValue += (hexValue.charAt(i).charCodeAt(0) - 48) * base;

			// incrementing base by power
			base = base * 16;
		}

		// if character lies in 'A'-'F' , converting
		// it to integral 10 - 15 by subtracting 55
		// from ASCII value
		else if (hexValue.charAt(i) >= 'A'
				&& hexValue.charAt(i) <= 'F') {
			decValue += (hexValue.charAt(i).charCodeAt(0) - 55) * base;

			// incrementing base by power
			base *= 16;
		}
	}
	return decValue;
}

module.exports = hexToDec;
