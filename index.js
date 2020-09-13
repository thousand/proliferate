const fs = require( 'fs/promises' );
const path = require( 'path' );
const FileProliferation = require( './lib/file-proliferation' );
const Consumption = require( './lib/consumption' );

/**
 * @typedef FileProliferationConfig
 * @property fileName {string}
 * @property filePath {string}
 * @property content {string|function}
 */

/**
 * @typedef ConsumptionConfig
 * @property fileName {string}
 * @property filePath {string}
 * @property content {string|function}
 * @property prefix {string}
 * @property suffix {string}
 */

/**
 * @typedef ProliferationConfig
 * @property count {number}
 * @property basePath {string}
 * @property proliferations {FileProliferationConfig[]}
 * @property consumptions {ConsumptionConfig[]}
 */

const DEFAULT = {
  count: 1,
  base: '',
  proliferations: [],
  consumptions: [],
};


const ID_TOKEN = '%ID%';

module.exports = class Proliferation {
  /**
   * @type {ProliferationConfig}
   */
  config = {};

  constructor ( config ) {
    Object.assign( this.config, DEFAULT, config );
  }

  async write () {
    const { config } = this;

    this._proliferations = config.proliferations.map( ( p ) => {
      return new FileProliferation( Object.assign(
        p,
        {
          count: config.count,
          filePath: path.join( config.basePath, p.filePath ),
        },
      ) );
    } );

    this._consumptions = config.consumptions.map( ( c ) => {
      return new Consumption( Object.assign(
        c,
        {
          count: config.count,
          filePath: path.join( config.basePath, c.filePath ),
        },
      ) );
    } );

    const runs = [ ...this._proliferations, ...this._consumptions ];
    const running = runs.map( ( r ) => r.write() );

    try {
      await Promise.all( running );
    } catch (e) {
      throw e;
    }
  }
};
