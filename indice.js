var      os = require('os');
var     rnd = require('random');
const    cp = require('child_process').spawn
var      ls = require('light-server')

var     min = 9000; var max = 20000 ;
var       p = rnd.int(min = min, max = max);

console.log( '****************************** ' );
console.log( '*** Usando light-server     ' );
console.log( '***  en directorio actual ' );
console.log( '***  con puerto aleatorio ' );
console.log( '*** ' );
console.log( '*** ^C para cancelar ' );
console.log( '*** ' );
console.log( '*** Servidor ', os.hostname() );
console.log( '*** Exponiendo a la web en puerto ', p );
console.log( '****************************** ' );
console.log( '*** Dirección IP ' );

var  ifaces = os.networkInterfaces();

Object.keys(ifaces).forEach(function (ifname) {
  var alias = 0;

  ifaces[ifname].forEach(function (iface) {

    if (alias >= 1) {
      // this single interface has multiple ipv4 addresses
      console.log(ifname + ' ' + alias, iface.address + ':' + p );
    } else {
      // this interface has only one ipv4 adress
      console.log(ifname, iface.address + ':' + p );
    }
    ++alias;
  });
});

const lserv = cp('light-server', ['-s', '.', '-p', p, '-o' ]);

lserv.stdout.on('data', (data) => {
  console.log(`ejecutando: ${data}`);
});

lserv.stderr.on('data', (data) => {
  console.error(`error: ${data}`);
});

lserv.on('close', (code) => {
  console.log(`El proceso sa cerró con el código ${code}`);
});

