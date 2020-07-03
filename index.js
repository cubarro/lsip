// Servidor web
// https://stackoverflow.com/a/44667294/694915
const rnd = require('random')
const { exec } = require('child_process');
var os = require('os')
var p = rnd.int(min = 9000, max = 20000)

console.log( '*** ^C para cancelar *** ' )
console.log( 'Servidor ', os.hostname() )
console.log( 'Exponiendo a la web en puerto ', p )
console.log( 'Dirección IP ' )

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

var llamada = 'light-server -s . -p ' + p + ' -o'
exec(llamada,
        (error, stdout, stderr) => {
            console.log(stdout)
            console.log(stderr)
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
        }
	)