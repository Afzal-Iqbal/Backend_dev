const {addToCart, changeQty, name} = require("./cartModule")

console.log("I am starting revising backend")
let l = [10,20,30,40,50]
l.forEach((value, index) =>{
    console.log(value, index)
})
console.log(addToCart())
console.log(changeQty())
console.log(name)