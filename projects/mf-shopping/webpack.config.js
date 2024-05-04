const { shareAll, withModuleFederationPlugin, SharedMappings } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'mfShopping',

  exposes: { 
        // van los modulos que se quieran compartir con los otros proyectos
        // en caso de que se quiera compartir un componente, iria en una libreria, ya que en los microfronend va orientado a una logica de negocio especifica
    './Component': './projects/mf-shopping/src/app/app.component.ts',
    './Routes': './projects/mf-shopping/src/app/app.routes.ts'
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
  sharedMappings: [ "@coomons-lib" ]

});
