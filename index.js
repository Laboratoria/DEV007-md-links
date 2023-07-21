
// const validateLinks = async () => {
//   try {
//     const results = await Promise.all(
//       linkObjects.map((linkObj) => check(linkObj.href))
//     );

//     results.forEach((result, index) => {
//       linkObjects[index].valid = result.status === 'alive';
//     });

//     console.log(linkObjects);
//   } catch (error) {
//     console.error('Error al validar los enlaces:', error);
//   }
// };

// validateLinks();