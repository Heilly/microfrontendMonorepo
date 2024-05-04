const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  remotes: { //Se define las rutas en la que se van a ejecutar los otros proyectos
             //ng add @angular-architects/module-federation --project mf-shopping --port 4201 --type remote
    "mfPayment": "http://localhost:4202/remoteEntry.js",
    "mfShopping": "http://localhost:4201/remoteEntry.js",    
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
  sharedMappings: [ "@coomons-lib" ]

});
