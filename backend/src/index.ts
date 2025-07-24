import express,{Express} from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
const port = 3000;

const app:Express = express();
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log('Server started on port ' + port);
}
);