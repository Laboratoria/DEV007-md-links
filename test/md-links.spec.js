const { mdLinks } = require("../index.js");

describe("mdLinks", () => {
  it("should...", () => {
    console.log("FIX ME!");
  });
  //  recibe un objeto vacio
  /* it("should return a promise", () => {
    expect(mdLinks()).toBe(typeof Promise);
  }); */
  //  sgt4e es un test asíncrono
  it("reject promise if path doesnt exist", () => {
    // catch toma un callback por lo que se agrega la fn flecha
    return mdLinks("examples/doesntexist.md").catch((error) => {
      expect(error).toBe("La ruta no existe");
    });
  });
});

/*
console.log(chalk.blue(mdLinks("./README.md"))); esto me devuelve [object promise]
*/
