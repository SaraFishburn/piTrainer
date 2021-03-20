// spigot algorithm courtesy of Vladimir Agafonkin https://observablehq.com/@mourner/calculating-pi-digits
digits = function* digits() {
  let q = 1n, r = 0n, t = 1n, k = 1n, n = 3n, l = 3n
  while (true) {
    if (q * 4n + r - t < n * t) {
      yield Number(n)
      const nr = (r - n * t) * 10n
      n = (q * 3n + r) * 10n / t - n * 10n
      q *= 10n; r = nr
    } 
    else {
      const nr = (q * 2n + r) * l
      const nn = (q * k * 7n + 2n + r * l) / (t * l)
      q *= k; t *= l
      l += 2n; k += 1n
      n = nn; r = nr
    }  
  }
}

function calculatePi(num) {
  const gen = digits()
  const pi = []
  for(let i = 0; i < num; i++) {
    pi.push(gen.next().value)
  }
  pi.splice(1, 0, '.')
  return pi
}
