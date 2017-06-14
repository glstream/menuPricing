var latte = (temperature, callback) => {
   if (temperature >= 70) {
       price = 5.11
   } else {
       price = 4.95
   }


   callback(undefined, {
                price: price
            })  
} 

module.exports = {latte}