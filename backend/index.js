const server = require("./src/app");
const { conn } = require("./src/db");




conn.sync({ force: true }).then(async () => {
  server.listen(3001, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
});
