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
static cancelTrip(request, response){
     /**
     * @description Admin cancel trip
     * @param { Object } request 
     * @param { Object } response
     * @return { JSON } return  
     */
    const trip = trips.find(trip=> trip.trip_id === +request.params.tripId);
    if(!trip){
        return response.status(404).json({
            status: 404,
            error: 'Trip not found'
        })
    }
    trip.status = 'cancel';
     return response.status(200).json({
         status: 200,
         data: {
             trip,
             message: 'Trip cancelled successfully'
         }
     })
}

}

export default Trip;