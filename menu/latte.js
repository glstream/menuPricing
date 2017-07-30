
var latte = (temperature, callback) => {
    price1 = temperature/10
    price = price1.toFixed(2)
//    if (temperature > 90) {
//        price = 5.09
//    } else if (temperature > 80){
//        price = 5.31
//    } else if (temperature > 70){
//        price = 5.41
//    } else if (temperature > 69) {
//       price = 5.52
//    } else if (temperature > 68) {
//       price = 5.69
//    } else if (temperature > 67) {
//       price = 5.87
//    } else if (temperature > 66) {
//       price = 5.99
//    } else if (temperature > 65) {
//       price = 6.03
//    } else if (temperature > 64) {
//       price = 6.08
//    } else if (temperature > 63) {
//       price = 6.11
//    } else if (temperature > 62) {
//       price = 6.18
//    } else if (temperature > 61) {
//       price = 6.22
//    } else if (temperature > 60){
//        price = 6.24
//    } else if (temperature > 50){
//        price = 7.00
//    } else {
//        price = 4.95
//    }
   callback(undefined, {
                price: price
            })  
} 


var coffee = (temperature, callback) => {
   price1 = temperature/6
    price = price1.toFixed(2)
   callback(undefined, {
                price: price
            })  
} 

module.exports = {latte, coffee}