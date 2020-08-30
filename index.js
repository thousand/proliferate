const fs = require( 'fs/promises' );
const path = require( 'path' );
const files = require( './component-files.json' );

const ID_TOKEN = '%ID%';

class FileModel {
  count = 1;
  fileName = '%ID%';
  filePath = 'output';
  content = '%ID%';

  constructor ( config ) {
    Object.assign( this, config );
    this._idLen = this.count.toString().length;
  }

  async dump () {
    await fs.mkdir( this.filePath, { recursive: true } );

    for ( let i = 0; i < this.count; i++ ) {
      const currId = i.toString().padStart( this._idLen, '0' );
      const currFile = this.fileName.replace( '%ID%', currId );
      const currContent = this.content.replace( '%ID%', currId );
      const fullPath = path.join( this.filePath, currFile );
      await fs.writeFile( fullPath, currContent );
    }
  }
}

files.files.forEach( async ( f ) => {
  const fm = new FileModel( { count: files.count, ...f } );
  await fm.dump();
} );



