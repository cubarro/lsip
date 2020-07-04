var os = require('os');
var rnd = require('random');
var sp = require('child_process').spawn
var ls = require('light-server')

var min = 9000; var max = 20000 ;
var p = rnd.int(min = min, max = max);

console.log( '*** ^C para cancelar *** ' );
console.log( 'Servidor ', os.hostname() );
console.log( 'Exponiendo a la web en puerto ', p );
console.log( 'Dirección IP ' );

var ifaces = os.networkInterfaces();

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

if ( os.type().substring(-3,3) == 'Win') {
	// Es windows
	consola = 'cmd'
} else {
	// No es windows
	consola = 'bash'
}

var llamada = 'light-server -s . -p ' + p + ' -o' ;
// ls( '-P 9090 -O' )
sp(consola, ['/c', llamada ], { stdio: 'inherit'})
