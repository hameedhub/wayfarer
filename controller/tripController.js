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
static viewTrip(request, response){
     /**
     * @description Admin and user view trips
     * @param { Object } request 
     * @param { Object } response
     * @return { JSON } return  
     */
    //user data..
    const { id, is_admin } = request.userData;

    return response.status(200).json({
        status: 200,
        data: trips
    })
}

}

export default Trip;