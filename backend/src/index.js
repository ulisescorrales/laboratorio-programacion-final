import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { cervezasRouter } from './routes/cervezas_router.js'
import { cortesRouter } from './routes/cortes_router.js'
import { loginRouter } from './routes/login_router.js'
const port = 3000;



const app = express();
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const router=express.Router();
app.use("/api/",router)
app.use(express.static("src/assets"))
app.use("/api/",cervezasRouter,cortesRouter,loginRouter)
app.listen(port, () => {
	console.log('Server started on port ' + port);
});
