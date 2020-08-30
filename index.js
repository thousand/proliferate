const fs = require( 'fs/promises' );
const path = require( 'path' );

const ID_TOKEN = '%ID%';

module.exports = class Proliferation {
  count = 1;
  fileName = '%ID%';
  filePath = 'output';
  content = '%ID%';

  constructor ( config ) {
    Object.assign( this, config );
    this._idLen = this.count.toString().length;
  }

  async write () {
    await fs.mkdir( this.filePath, { recursive: true } );

    for ( let i = 0; i < this.count; i++ ) {
      const currId = i.toString().padStart( this._idLen, '0' );
      const currFile = this.fileName.replace( ID_TOKEN, currId );
      const currContent = this.content.replace( ID_TOKEN, currId );
      const fullPath = path.join( this.filePath, currFile );
      await fs.writeFile( fullPath, currContent );
    }
  }
}
