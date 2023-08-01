const { mdLinks } = require("./index.js");

mdLinks("/doesntexist/")
.then(()=>{})
.catch((error) => {
    console.console.log(error);
});