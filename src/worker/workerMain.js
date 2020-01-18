export const calculatePrimes = (iterations, multiplier) => {
	let primes = [];
	for (let i = 1; i <= iterations; i++) {
		let candidate = Math.floor(i * (multiplier * Math.random()));
		let isPrime = true;

		for (var c = 2; c <= Math.sqrt(candidate); ++c) {
			if (candidate % c === 0) {
				// not prime
				isPrime = false;
				break;
			}
		}
		if (isPrime) {
			primes.push(candidate);
		}
	}
	postMessage({
		type: "DONE",
		primes
	});
};
