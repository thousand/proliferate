const fs = require( 'fs/promises' );
const path = require( 'path' );
const Proliferation = require( '../index' );

const OUTPUT_PATH = path.join( __dirname, 'data' );

async function setup () {
  // create a proliferation
  const p = new Proliferation( {
    count: 15,
    fileName: 'file-%ID%.json',
    filePath: OUTPUT_PATH,
    content: '{ "id": "%ID%" }',
  } );

  // make it rain
  await p.write();
}

async function testFilePaths () {
  let files = await fs.readdir( OUTPUT_PATH );

  if ( files.length !== 15 ) {
    throw new Error( `File count incorrect, expected 15 got ${ files.length }` );
  }

  files.forEach( ( f, i ) => {
    let id = i.toString().padStart( 2, 0 );
    if ( f !== `file-${ id }.json` ) {
      throw new Error( 'File name incorrect' );
    }
  } );
}

async function testFileContents () {
  let files = await fs.readdir( OUTPUT_PATH );

  if ( files.length !== 15 ) {
    throw new Error( 'File count incorrect' );
  }

  files.forEach( ( f, i ) => {
    let content = require( path.join( OUTPUT_PATH, f ) );
    if ( content.id !== i.toString().padStart( 2, 0 ) ) {
      throw new Error( 'File content incorrect' );
    }
  } );
}

async function cleanup () {
  fs.rmdir( OUTPUT_PATH, { recursive: true } );
}

async function run () {
  await setup();
  await testFilePaths();
  await testFileContents();
  await cleanup();
}

run();
