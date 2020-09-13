const fs = require( 'fs/promises' );
const path = require( 'path' );

/**
 * @typedef config
 * @property fileName {string}
 * @property filePath {string}
 * @property content {string|function}
 */

const ID_TOKEN = '%ID%';

/**
 * @type {config}
 */
const DEFAULT = {
  count: 1,
  fileName: '%ID%',
  filePath: 'output',
  content: '%ID%',
};


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
    try {
      const { config } = this;
      await fs.mkdir( config.filePath, { recursive: true } );

      for ( let i = 0; i < config.count; i++ ) {
        const currId = i.toString().padStart( this._idLen, '0' );
        const currFile = config.fileName.replace( ID_TOKEN, currId );
        const currContent = typeof config.content === 'function'
          ? config.content( currId )
          : config.content.replace( ID_TOKEN, currId );
        const fullPath = path.join( config.filePath, currFile );
        await fs.writeFile( fullPath, currContent );
      }
    }
    catch ( e ) {
      throw new Error( `Error in consumption write: ${ e }` );
    }
  }
};
