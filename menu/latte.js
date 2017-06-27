
var latte = (temperature, callback) => {
   if (temperature > 90) {
       price = 5.11
   } else if (temperature > 80){
       price = 5.16
   } else if (temperature > 70){
       price = 5.21
   } else if (temperature > 60){
       price = 5.24
   } else if (temperature > 50){
       price = 6.00
   } else {
       price = 4.95
   }
   callback(undefined, {
                price: price
            })  
} 


var coffee = (temperature, callback) => {
   if (temperature > 90) {
       price = 2.09
   } else if (temperature > 80){
       price = 2.12
   } else if (temperature > 70){
       price = 3.41
   } else if (temperature > 60){
       price = 3.24
   } else if (temperature > 50){
       price = 4.00
   } else {
       price = 2.95
   }
   callback(undefined, {
                price: price
            })  
} 

module.exports = {latte, coffee}