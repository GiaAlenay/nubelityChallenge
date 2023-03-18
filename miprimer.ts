const domains_list:string = `*.amazon.co.uk 89
*.doubleclick.net 139
*.fbcdn.net 212
*.in-addr.arpa 384
*.l.google.com 317
1.client-channel.google.com 110
6.client-channel.google.com 45
a.root-servers.net 1059
apis.google.com 43
clients4.google.com 71
clients6.google.com 81
connect.facebook.net 68
edgemqtt.facebook.com 56
graph.facebook.com 150
mail.google.com 128
mqttmini.facebook.com 47
ssl.google-analytics.com 398
star-mini.c10r.facebook.com 46
staticxx.facebook.com 48
www.facebook.com 178
www.google.com 162
www.googleanalytics.com 127`;


const count_domains=(domains:string, min_hits:number=0):string=>{

    const getnewDomain=(domain:string):string=>{
        
        const domNa:(string)[]=domain.split('.')       
        if (domNa[domNa.length-2] && domNa[domNa.length-2]==='co' || domNa[domNa.length-2]==='com' ) {
            return `${domNa[domNa.length-3]}.${domNa[domNa.length-2]}.${domNa[domNa.length-1]}`
        }
        else{
            return `${domNa[domNa.length-2]}.${domNa[domNa.length-1]}`
        }
    }


    const separateDom: string[][]=domains.trim().split('\n').map(sd=>{
        const getting=getnewDomain(sd.split(' ')[0])       
        return [getting,sd.split(' ')[1]]
    })
    
    const countedDomains: [string, string][] = Array.from(
    separateDom.reduce(
        (sep, [clave, valor]) => sep.set(clave, (sep.get(clave) ?? 0) + parseInt(valor)),
        new Map<string, number>()
    ),
    ([clave, valor]) => [clave, valor.toString()]
    );
    
    const filteredDomainCounts = Array.from(countedDomains).filter(([_, count]) => parseInt(count) >= min_hits);
    
    filteredDomainCounts.sort((a, b) => {
        const aNum = parseInt(a[1]);
        const bNum = parseInt(b[1]);        
        if (bNum - aNum !== 0) {
          return bNum - aNum;
        } else {
          return a[0].localeCompare(b[0]);
        }


      });
    
    let output:string[]=[]
    filteredDomainCounts.map((f)=>{
        output.push(`${f[0]} (${f[1]})${'\n'}`)
    })  
    
     
    

    return output.join('')
}

console.log(count_domains(domains_list, 300 ))