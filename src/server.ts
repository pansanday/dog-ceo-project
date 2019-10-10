import express, { Application, Request, Response } from 'express';
import * as dogCeoService from './services/DogCeoService'

const app: Application = express();

// get all breeds
app.get('/api/listAllBreed', dogCeoService.breed);

// get all sub breeds
app.get('/api/listAllSubBreed/:subbreedName', function(req: Request, resp: Response) {
    const name = req.query('subbreedName');
    dogCeoService.subbreedList(name, req, resp);
});

// get all breeds and subbreed
app.get('/api/listAllBreedAndSubbreed', dogCeoService.breedAndSubbreed);

// get all images by breed name
app.get('/api/getImgsByBreed/:dogName', function(req: Request, resp: Response) {
    const name = req.param('dogName');
    dogCeoService.imgsByBreed(name, req, resp);
});

const port = 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));