const sleep = (time) => new Promise((r) => setTimeout(r, time))

document.addEventListener('DOMContentLoaded', async function() 
{
  let input = document.getElementById('input')
  input.disabled = true
  let limit = 5
  let pi = calculatePi(limit)
  await printPi(pi)
  input.disabled = false
  input.focus()

  input.addEventListener('keyup', async function () {
    if(compareDigits(pi, input)) {
      console.log('success')

      if(input.value.length === pi.length) {
        input.style.color = 'green'
        await sleep(500)
        input.value = ''
        input.disabled = true
        input.style.color = null
        
        limit += 1
        pi = calculatePi(limit)
        await printPi(pi)
        input.disabled = false
        input.focus()
      }
    } 
    else {
      console.log('fail')
    }
  })
})

// spigot algorithm by Vladimir Agafonkin https://observablehq.com/@mourner/calculating-pi-digits
digits = function* findDigits() {
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

async function printPi(pi) {
  element = document.getElementById('pi')
  for(let i = 0; i < pi.length; i++) {
    element.textContent += pi[i]
    await sleep(500)
  }
  element.textContent = ''
}

function compareDigits(pi, input) { 
  let input_array = input.value.split('')
  let index = input_array.length - 1

  if(pi[index] != input_array[index]) {
    return false
  }
  return true
}
