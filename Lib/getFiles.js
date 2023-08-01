import fs from 'fs';
import path from 'path';
// ===============================Get Files============================
export const extractedMD = (route) => {
    const thisRoute = route;
    const arrayMD = [];
    // -----------------------Check Directory
    const checkDirectory = (route) => {
        const stats = fs.statSync(route);

        if (stats.isDirectory()) {
            const filesMD = fs.readdirSync(route);
            filesMD.forEach((file) => {
                const fileRoute = path.join(route, file);
                checkDirectory(fileRoute);
            });
        } else if (path.extname(route) === '.md') {
            arrayMD.push(route);
        }
    };

    checkDirectory(thisRoute);

    return arrayMD;
};


//console.log(extractedMD('C:\\Users\\Javiera\\Desktop\\Laboratoria\\MDLinks\\DEV007-md-links\\Lib'));