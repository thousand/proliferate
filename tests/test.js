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
  let files = await fs.readdir( path.join( OUTPUT_PATH, 'data' ) );

  if ( files.length !== 15 ) {
    throw new Error( `File count incorrect, expected 15 got ${ files.length }` );
  } else {
    console.log(`Found ${files.length} files`);
  }

  files.forEach( ( f, i ) => {
    let id = i.toString().padStart( 2, 0 );
    if ( f !== `file-${ id }.json` ) {
      throw new Error( 'File name incorrect' );
    } else {
      console.log(`file-${ id }.json has correct name`);
    }
  } );

}

async function testFileContents () {
  let files = await fs.readdir( path.join( OUTPUT_PATH, 'data' ) );

  if ( files.length !== 15 ) {
    throw new Error( 'File count incorrect' );
  }

  // test file proliferation contents
  files.forEach( ( f, i ) => {
    let content = require( path.join( OUTPUT_PATH, 'data', f ) );
    if ( content.id !== i.toString().padStart( 2, 0 ) ) {
      throw new Error( 'File content incorrect' );
    } else {
      console.log(`file-${ content.id }.json has correct content`);
    }
  } );

  let manifestContent = require( path.join( OUTPUT_PATH, 'manifest.json' ) );
  let manifestContentData = manifestContent.contents;

  // test consumption contents
  manifestContentData.forEach( ( entry, i ) => {
    let id = i.toString().padStart( 2, 0 );
    if ( entry !== `file-${ id }.json` ) {
      throw new Error( 'Manifest entry incorrect' );
    } else {
      console.log(`file-${ id }.json found in manifest`);
    }
  } );

}

async function cleanup () {
  await fs.rmdir( OUTPUT_PATH, { recursive: true } );
}

async function run () {
  await setup();
  await testFilePaths();
  await testFileContents();
  await cleanup();
}

run();
