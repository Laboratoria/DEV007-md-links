import {
  routeExist,
  pathIsAbsolute,
  absoluteRoute,
  pathUser,
  fileExtname,
} from "../functions.js";

// --------La ruta existe?-------
describe("routeExists", () => {
  it("is a function", () => {
    expect(typeof routeExist).toBe("function");
  });
  it("return a boolean", () => {
    expect(typeof routeExist("prueba.md")).toBe("boolean");
  });
  it("return true if exists", () => {
    expect(routeExist("prueba.md")).toBe(true);
  });
  it("return false if doesnt exists", () => {
    expect(routeExist("READMEE.md")).toBe(false);
  });
});

// --------Función para ver si la ruta es absoluta-------------
describe("pathIsAbsolute", () => {
  it("is a function", () => {
    expect(typeof pathIsAbsolute).toBe("function");
  });
  it("return a boolean", () => {
    expect(typeof pathIsAbsolute("README.md")).toBe("boolean");
  });
  it("return false if is not absolute", () => {
    expect(pathIsAbsolute("README.md")).toBe(false);
  });
  it("return true if is absolute", () => {
    expect(
      pathIsAbsolute(
        "/Users/nellyna/Desktop/LABORATORIA/DEV007-md-links/prueba.md"
      )
    ).toBe(true);
  });
});

//  -------convierte en absoluta---------------
describe("absoluteRoute", () => {
  it("is a function", () => {
    expect(typeof absoluteRoute).toBe("function");
  });
  it("return absolute path", () => {
    expect(typeof absoluteRoute("Readme.md")).toBe("string");
  });
});
it("return absolute path", () => {
  expect(absoluteRoute("README.md")).toBe(
    "/Users/nellyna/Desktop/LABORATORIA/DEV007-md-links/README.md"
  );
});

//  ----------Es un archivo?---------------
describe("pathUser", () => {
  it("is a function", () => {
    expect(typeof pathUser).toBe("function");
  });
  it("return a boolean", () => {
    expect(typeof pathUser("README.md")).toBe("boolean");
  });
  it("return true if its a file", () => {
    expect(pathUser("README.md")).toBe(true);
  });
});

//  ---------es archivo .md--------------
describe("fileExtname", () => {
  it("is a function", () => {
    expect(typeof fileExtname).toBe("function");
  });
  it("return a string", () => {
    expect(typeof fileExtname("README.md")).toBe("string");
  });
  it("return .md extension", () => {
    expect(fileExtname("README.md")).toBe(".md");
  });
  it("return extension", () => {
    expect(fileExtname("functions.js")).toBe(".js");
  });
  it("return string", () => {
    expect(fileExtname("/test")).toBe("");
  });
});
