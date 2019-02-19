const routesFolder = 'api/routes/';
const fs = require('fs');
const addRoutes = (data) => {
  data.map(item => {
    let objNew = {}
    objNew[item.path] = item.context
    Object.assign(listRoutes, objNew);
  })
}
let listRoutes = { '/': { view: 'pages/homepage' } };// routest default home
fs.readdirSync(routesFolder).forEach(file => {
  const routesFile = require(`../${routesFolder+file}`);
  addRoutes(routesFile)
});

module.exports.routes = listRoutes