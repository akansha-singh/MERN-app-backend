const uuid = require('uuid');
const HttpError = require('../models/http-error');
let DUMMY_PLACES = [
    {
      id: 'p1',
      title: 'Empire State Building',
      description: 'One of the most famous sky scrapers in the world!',
      location: {
        lat: 40.7484474,
        lng: -73.9871516
      },
      address: '20 W 34th St, New York, NY 10001',
      creator: 'u1'
    }
  ];


const getPlaceById = (req,res,next)=>{
    const placeId = req.params.pid;
    const place = DUMMY_PLACES.find(p => {
        return p.id===placeId;
    });
    if (!place) {
        throw new HttpError('Could not find a place for the provided id.', 404);
      }
    res.json({place});
};

const getPlacesByUserId = (req,res,next)=>{
    const userId = req.params.uid;
    const places = DUMMY_PLACES.filter(p => {
        return p.creator === userId;
    });
    if (!places || places.length === 0) {
        return next(
          new HttpError('Could not find places for the provided user id.', 404)
        );
      }    
    res.json({places});
};

const createPlace = (req,res,next) => {
    const {title, description, coordinates, address, creator} = req.body;
    // const title= = req.body.title;
    const createdPlace = {
        id: uuid,
        title,
        description,
        location: coordinates,
        address,
        creator     
    };
    DUMMY_PLACES.push(createdPlace);
    res.status(201).json({place: createdPlace});
};

const updatePlace = (req, res, next) => {
  // const {title, description} = req.body;
  // const placeId = req.params.pid;
  // const updatePlace = DUMMY_PLACES.find(p => p.id === placeId);
};
const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;
  DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId);
  res.status(200).json({message: 'Deleted place'});
};


exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;