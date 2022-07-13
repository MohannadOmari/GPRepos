const {MongoClient} = require('mongodb');

async function main(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     */
    const mongoURI = "mongodb+srv://mohannadalomari:Mohannad_2@bidhaauction.y4bgeky.mongodb.net/?retryWrites=true&w=majority";
 

    const client = new MongoClient(mongoURI);
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        //await  listDatabases(client);
 
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

/*async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};*/