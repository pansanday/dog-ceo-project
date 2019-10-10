import * as request from 'request'
import {Request, Response} from 'express';

/**
 * 获取所有的breed和subbreed
 * @param req
 * @param res
 */
export let breedAndSubbreed = (req: Request, res: Response) => {
    let dcService: DogCeoService = new DogCeoService();
    dcService.getAllBreeds((resp: any) => {

        const {message} = JSON.parse(resp);

        const breedArr = [];
        for (let prop in message) {
            const obj = {
                breed: '',
                subbreed: <any>[]
            };
            obj.breed = prop;
            obj.subbreed = message[prop].toString();
            breedArr.push(obj);
        }

        res.send(breedArr);
    });
};

/**
 * 获取所有的breed
 * @param req
 * @param res
 */
export let breed = (req: Request, res: Response) => {
    let dcService: DogCeoService = new DogCeoService();
    dcService.getAllBreeds((resp: any) => {
        const {message} = JSON.parse(resp);
        const breedArr = [];
        for (let prop in message) {
            breedArr.push(prop);
        }
        res.send(breedArr);
    });
};

export let imgsByBreed = (dogName: string, req: Request, res: Response) => {
    let dcService: DogCeoService = new DogCeoService();
    dcService.getImgsByBreed(dogName, (resp: any) => {
        const {message} = JSON.parse(resp);
        res.send(message);
    });
};


export let subbreedList = (subbreedName: string, req: Request, res: Response) => {
    let dcService: DogCeoService = new DogCeoService();
    dcService.getAllSubBreeds(subbreedName, (resp: any) => {
        const {message} = JSON.parse(resp);
        res.send(message);
    });
};

/**
 * service used to retrieve data from website
 */
export class DogCeoService {

    getAllBreeds(cb: (resp: String) => any) {
        request.get("https://dog.ceo/api/breeds/list/all", (error: any, response: any, body: any) => {
            cb(body);
        })
    }

    getAllSubBreeds(subbreedName: string, cb: (resp: String) => any) {
        request.get("https://dog.ceo/api/breed/" + subbreedName + "/list", (error: any, response: any, body: any) => {
            cb(body);
        })
    }

    getImgsByBreed(dogName: string, cb: (imgResp: string) => any) {
        request.get("https://dog.ceo/api/breed/" + dogName + "/images", (error: any, response: any, body: any) => {
            cb(body);
        })
    }
}

