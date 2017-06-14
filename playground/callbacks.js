var getUser = (id, callback) => {
    var user = {
        id: id,
        name: 'Graybaby'
    };
    setTimeout(()=>{
        callback(user)
    }, 1500)
};

getUser(31, (user) => {
    console.log(user)
})