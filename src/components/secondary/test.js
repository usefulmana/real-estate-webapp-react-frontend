var string = ['fdasfdasfasd.jpg', 'fdasfas.png','fdasfdas'];

doCheck = elem => {
  return elem.endsWith('.jpg') || elem.endsWith('.png');
};

console.log(string.every(doCheck))