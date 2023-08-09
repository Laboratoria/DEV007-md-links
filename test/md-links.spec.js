//const { mdLinks } = require("../index.js");
const functions = require("../functions.js");
const fs = require("fs");
const { type } = require("os");
const path = require("path");
describe("functions.pathIsAbsolute", () => {
  it("is a function", () => {
    expect(typeof functions.pathIsAbsolute).toBe("function");
  });
  it("return a boolean", () => {
    expect(typeof functions.pathIsAbsolute("testReadme.md")).toBe("boolean");
  });
  it("return false", () => {
    expect(functions.pathIsAbsolute("testReadme.md")).toBe(false);
  });
});
describe("functions.pathUser", () => {
  it("is a function", () => {
    expect(typeof functions.pathUser).toBe("function");
  });
  it("return a boolean", () => {
    expect(typeof functions.pathUser("testReadme.md")).toBe("boolean");
  });
  it("return true", () => {
    expect(functions.pathUser("testReadme.md")).toBe(true);
  });
});
describe("functions.absoluteRoute", () => {
  it("is a function", () => {
    expect(typeof functions.absoluteRoute).toBe("function");
  });
  it("return absolute path", () => {
    expect(typeof functions.absoluteRoute("testReadme.md")).toBe("string");
  });

  it("return absolute path", () => {
    expect(functions.absoluteRoute("testReadme.md")).toBe(
      "C:\\Users\\isabe\\OneDrive\\Documentos\\Laboratoria\\MDLINKS\\Isa-mdLinks\\testReadme.md"
    );
  });
});

/*
describe("mdLinks", () => {
  it("should...", () => {
    console.log("FIX ME!");
  });
  //  recibe un objeto vacio

  //  sgt4e es un test asíncrono
  it("reject promise if path doesnt exist", () => {
    // catch toma un callback por lo que se agrega la fn flecha
    return mdLinks("examples/doesntexist.md").catch((error) => {
      expect(error).toBe("La ruta no existe");
    });
  });

  it("is a function", () => {
    expect(typeof mdLinks).toBe("function");
  });
  it("return an object", () => {
    const response = mdLinks("./README.md");
    expect(typeof response).toBe("object");
  });
});
*/
// console.log(chalk.blue(mdLinks("./README.md"))); esto me devuelve [object promise]
