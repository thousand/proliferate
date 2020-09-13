const fs = require( 'fs/promises' );
const path = require( 'path' );

/**
 * @typedef config
 * @property fileName {string}
 * @property filePath {string}
 * @property content {string|function}
 * @property prefix {string}
 * @property suffix {string}
 */

/**
 * @type {config}
 */
const DEFAULT = {
  count: 1,
  fileName: '%ID%',
  filePath: 'output',
  content: '%ID%',
  prefix: '',
  suffix: '',
};

const ID_TOKEN = '%ID%';

module.exports = class FileProliferation {
  /**
   * @member {config}
   */
  config = {};

  /**
   * @param options {config}
   */
  constructor ( options ) {
    Object.assign( this.config, DEFAULT, options );

    const { config } = this;
    this._idLen = config.count.toString().length;
  }

  async write () {
    let { config } = this;

    const fileContent = [];
    fileContent.push( config.prefix );
    for ( let i = 0; i < config.count; i++ ) {
      const currId = i.toString().padStart( this._idLen, '0' );
      const currContent = typeof this.content === 'function'
        ? config.content( currId )
        : config.content.replace( ID_TOKEN, currId );
      fileContent.push( currContent );
    }
    fileContent.push( config.suffix );
    debugger;

    try {
      await fs.mkdir( config.filePath, { recursive: true } );
      const consumptionFile = await fs.open( path.join( config.filePath, config.fileName ), 'w');
      await consumptionFile.writeFile( fileContent.join('\n') );
      await consumptionFile.close();
    }
    catch ( e ) {
      throw new Error( `Error in consumption write: ${ e }` );
    }
  }
};
