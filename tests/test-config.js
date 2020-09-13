const path = require( 'path' );

module.exports = {
  count: 15,
  basePath: path.join( __dirname, 'fixture' ),

  proliferations: [
    {
      fileName: 'file-%ID%.json',
      filePath: 'data',
      content: '{ "id": "%ID%" }',
    },
  ],

  consumptions: [
    {
      fileName: 'manifest.json',
      filePath: '',
      content: function ( id ) { return `"file-${ id }.json"${ id !== '14' ? ',' : '' }`; },
      prefix: '{ "contents": [',
      suffix: ']}',
    },
  ],
};
