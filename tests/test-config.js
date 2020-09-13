const path = require('path');

module.exports = {
  count: 1000,
  basePath: path.join(__dirname, 'fixture/app'),

  proliferations: [
    {
      fileName: 'component-%ID%.hbs',
      filePath: 'templates/components',
      content: '<li block:scope>%ID%</li>'
    },
    {
      fileName: 'component-%ID%.block.scss',
      filePath: 'styles/components',
      content: function(id) {
        const c = Math.floor(Math.random()*16777215).toString(16);
        return `:scope { color: #${c}; } :scope:after { content: '${id}'; }`
      }
    }
  ],

  consumptions: [
    {
      fileName: 'index.hbs',
      filePath: 'templates/',
      content: '{{my-component-%ID%/}}',
      prefix: '<ul>',
      suffix: '</ul>'
    }
  ]
};
