const hapi   = require('hapi');

const server = hapi.server({
  port: 8080,
  host: 'localhost'
});

const init = async () => {
  await server.start();
  console.log(`Server run at: ${server.info.uri}`);
};
init();
