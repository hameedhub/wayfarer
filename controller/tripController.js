import trips from '../database/persistentData/trips.json';

/**
 * @description Trip routes
 */
class Trip{

static createTrip(request, response){
     /**
     * @description Admin create trip
     * @param { Object } request 
     * @param { Object } response
     * @return { JSON } return  
     */

    const data = {trip_id :trips.length+1, ...request.body, status: 'active'};
    trips.push(data);
    return response.status(201).json({
        status: 201,
        data
    })
}

}

export default Trip;