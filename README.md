# Proliferate

*/pɹəˈlɪf.əɹ.eɪt/* (transitive, intransitive)  
To increase in number or spread rapidly; to multiply.
> The files proliferated rapidly.

---

Create a bunch of simple files in a jiffy.

Right now it's pretty simple and just makes a bunch of files in a brute force way.
In the future I'd like to support more token replacement, and bulk creation of
directories in addition to files.

## Usage

```js
const Proliferation = require('proliferate');

// create a proliferation
const p = new Proliferation({
  count: 5,
  fileName: 'file-%ID%.json',
  filePath: 'data',
  content: '{ "id": "%ID%" }'
});

// make it rain
await p.write();
```

## Usage

The `Proliferation` class takes a simple configuration object. Right now it simply
replaces the `%ID%` token where it appears in the file name or content with a numeric ID. 
The ID is zero indexed, left padded to match the full count. 

`Proliferation` class instances have a single, async method,`write`. It uses
`fsPromises.writeFile()`, and does `path.join(filePath, fileName)` for the location.
*Any files which already exist will be replaced.*

### API

Property     | What you need to know
------------ | -------------
`count` | Number. How many files to make
`filePath` | String. Base path for where the files will be written. If it does not exist, it will be created recursively.
`fileName` | String. Template for the name of the file. `%ID%` will be replaced with the ID as described above.
`content` | String. What goes in the file. `%ID%` will be replaced with the ID as described above.
