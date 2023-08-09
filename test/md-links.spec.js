//const { mdLinks } = require("../index.js");
const functions = require("../functions.js");

describe("functions.routeExists", () => {
  it("is a function", () => {
    expect(typeof functions.routeExists).toBe("function");
  });
  it("return a boolean", () => {
    expect(typeof functions.routeExists("testReadme.md")).toBe("boolean");
  });
  it("return true if exists", () => {
    expect(functions.routeExists("testReadme.md")).toBe(true);
  });
  it("return false if doesnt exists", () => {
    expect(functions.routeExists("testing")).toBe(false);
  });
});
describe("functions.pathIsAbsolute", () => {
  it("is a function", () => {
    expect(typeof functions.pathIsAbsolute).toBe("function");
  });
  it("return a boolean", () => {
    expect(typeof functions.pathIsAbsolute("testReadme.md")).toBe("boolean");
  });
  it("return false if is not absolute", () => {
    expect(functions.pathIsAbsolute("testReadme.md")).toBe(false);
    console.log(functions.absoluteRoute("testReadme.md"));
  });
  it("return true if is absolute", () => {
    expect(
      functions.pathIsAbsolute(
        "C:\\Users\\isabe\\OneDrive\\Documentos\\Laboratoria\\MDLINKS\\Isa-mdLinks\\testReadme.md"
      )
    ).toBe(true);
  });
});
describe("functions.pathUser", () => {
  it("is a function", () => {
    expect(typeof functions.pathUser).toBe("function");
  });
  it("return a boolean", () => {
    expect(typeof functions.pathUser("testReadme.md")).toBe("boolean");
  });
  it("return true if its a file", () => {
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
describe("functions.fileEx", () => {
  it("is a function", () => {
    expect(typeof functions.fileEx).toBe("function");
  });
  it("return a string", () => {
    expect(typeof functions.fileEx("testReadme.md")).toBe("string");
  });
  it("return md extension", () => {
    expect(functions.fileEx("testReadme.md")).toBe(".md");
  });
  it("return js extension", () => {
    expect(functions.fileEx("functions.js")).toBe(".js");
  });
  it("return empty string", () => {
    expect(functions.fileEx("/test")).toBe("");
  });
});
/*
describe("functions.readingFile", () => {
  it("is a function", () => {
    expect(typeof functions.readingFile).toBe("function");
  });
  it("return a string", () => {
    expect(typeof functions.readingFile("testReadme2.md")).toBe("string");
  });
  it("return file text", () => {
    expect(
      functions
        .readingFile("testReadme2.md")
        .tobe("Link roto [broken2](https://www.cinemarkf.ccl/)")
    );
  });
});*/

/*describe("mdLinks", () => {
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
