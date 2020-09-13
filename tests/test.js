const fs = require( 'fs/promises' );
const path = require( 'path' );
const Proliferation = require( '../index' );
const testConfig = require( './test-config' );

const OUTPUT_PATH = path.join( __dirname, 'fixture' );

async function setup () {
  // create a proliferation
  const p = new Proliferation(
    Object.assign(
      {},
      testConfig,
    ),
  );

  // make it rain
  try {
    await p.write();
  }
  catch ( e ) {
    debugger;
    throw e;
  }
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
  await fs.rmdir( OUTPUT_PATH, { recursive: true } );
}

async function run () {
  await setup();
  // await testFilePaths();
  // await testFileContents();
  // await cleanup();
}

run();
