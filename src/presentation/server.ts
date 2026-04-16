import express from 'express'
import path from 'node:path';
import { backup } from 'node:sqlite';

interface Options {
    port: number;
    public_path: string;
}


export class Server {

    private app = express();
    private readonly port: number;
    private readonly publicPath: string;



    constructor(options: Options){
        const { port, public_path = 'public '} = options;
        this.port = port;
        this.publicPath = public_path;
    }
    


    
    async start() {
        
        //* Middlewares
        
        //* Public Folder
        this.app.use( express.static( this.publicPath ));



        this.app.get('/{*splat}', (req, res) => {
            const indexPaht = path.join(__dirname + `../../../${ this.publicPath }/index.html`);
            res.sendFile(indexPaht);
        })


        this.app.listen( this.port, () => {
            console.log(`Server running on port ${ this.port}`);
            
         });

    }

}