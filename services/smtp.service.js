//verifySMTP
const {SMTPClient}=require('smtp-client');
const verifySMTP=async (email,mxServer)=>{
 
const client=new SMTPClient({
  host:mxServer,
  port:25,
  timeout:5000,
});
try{
await client.connect();
await client.greet({hostname:'localhost'});
await client.mail({from:'test@example.com'});
await client.rcpt({to:email});
await client.quit();
return "Valid";
}catch(error){
  
    console.log("===== SMTP ERROR =====");
    console.dir(error, { depth: null });

    try {
        await client.quit();
    } catch (_) {}

    return "Unknown";
} 

};
module.exports={verifySMTP};