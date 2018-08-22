# blockly-sorter
The project is devoted to basic sorting algorithms,\
It pretends to be a place where students(or anyone else) would feel comfortable
to fiddle with algorithms to understand them better.


### Building:

`$ npm install` downloads all the needed packages into `./node_modules` dir.\
`$ gulp uncompressed` generates the `./uncompressed.js` ( wich is used in debug_index.html )\
`$ gulp compressed` compiles the code into a single `./compressed.js` file (is used in index.html)

`debug_index.html` is preferred to use during development, \
becouse after modifications in `./src/js` dir. it would be enough just to save files and reload the page,\
while  in case of  `index.html`  changes would only  appear  after\
`$ gulp compressed` wich is tricky to do after every single modification of sources; 
