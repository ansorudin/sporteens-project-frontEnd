var num = 2000000

num = num.toLocaleString('en-US', {
    style: 'currency',
    currency: 'IDR'
})

console.log(num)