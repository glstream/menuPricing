var latte = (temperature, callback) => {
   if (temperature <= 70) {
       price = 5.11
   } else if (temperature <= 50){
       price = 5.16
   } else if (temperature <= 40){
       price = 5.21
   } else if (temperature <= 30){
       price = 5.24
   } else if (temperature <= 20){
       price = 6.00
   } else {
       price = 4.95
   }
   callback(undefined, {
                price: price
            })  
} 

module.exports = {latte}