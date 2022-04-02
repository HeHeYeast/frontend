# A Self-defined Application Layer Protocol

## Get started
Use the cd command to access the myprotocol folder and run client.js with the command `node client.js`.

## Content of the protocol
The protocol header contains only the start symbol and the length of the data body.
The data is packed inside the module using pack() and unpacked using unpack() to get the data.