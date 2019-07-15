import Query from '../model/Query';

const trips = new Query('trips');
const bus = new Query('buses');
/**
 * @description Trip routes
 */
class Trip{
    /**
     * @description Admin create trip
     * @param { Object } request 
     * @param { Object } response
     * @return { JSON } return  
     */
    static async createTrip(request, response){
        try {
            const tripData =  {...request.body, status: 'active'};
            const { bus_id, origin, destination, trip_date, fare } = tripData;
            const resultData = await trips.insert(Object.keys(tripData),[`'${bus_id}', '${origin}', '${destination}', '${trip_date}', '${fare}', 'active'`]);
            const data = { ...resultData[0] };
            return response.status(201).json({
                status: 201,
                data,
                message: 'Trip was successfully created'
            })
        } catch (error) {
            return response.status(503).json({
                status: 503,
                error: 'Something went wrong, service not available'
            }) 
        }
    }
    /**
     * @description Admin and user view trips
     * @param { Object } request 
     * @param { Object } response
     * @return { JSON } return  
     */
    static async viewTrip(request, response){
        try {
            const data = await trips.selectAll();
            return response.status(200).json({
                status: 200,
                data
            })   
        } catch (error) {
            return response.status(503).json({
                status: 503,
                error: 'Something went wrong, service not available'
            })
        }
        
    }
    /**
     * @description Admin cancel trip
     * @param { Object } request 
     * @param { Object } response
     * @return { JSON } return  
     */
    static async cancelTrip(request, response){
        try {
            const data = await trips.update(`status='cancel'`, [`id='${request.params.tripId}'`]);
            if(!data[0]){
                return response.status(404).json({
                    status: 404,
                    error: 'Trip not found'
                })
            }
            return response.status(200).json({
                status: 200,
                data,
                message: 'Trip cancelled successfully'
            })
        } catch (error) {
            return response.status(503).json({
                status: 503,
                error: 'Something went wrong, service not available'
            })
        }
    }
    static async filterTripByDestination(request, response){
        try {
            const data = await trips.select(['*'], [`destination='${request.params.destination}'`]);
            if(!data[0]){
                return response.status(404).json({
                    status: 404,
                    error: `No available trip for ${request.params.destination} destination`
                })
            }
            return response.status(200).json({
                status: 200,
                data,
                message: `Trips available for ${request.params.destination} destination`
            })
        } catch (error) {
            return response.status(503).json({
                status: 503,
                error: 'Something went wrong, service not available'
            })
        }
    }
    static async filterTripByOrigin(request, response){
        try {
            const data = await trips.select(['*'], [`origin='${request.params.origin}'`]);
            if(!data[0]){
                return response.status(404).json({
                    status: 404,
                    error: `No available trip for ${request.params.origin} origin`
                })
            }
            return response.status(200).json({
                status: 200,
                data,
                message: `Trips available for ${request.params.origin} origin`
            })             
        } catch (error) {
            return response.status(503).json({
                status: 503,
                error: 'Something went wrong, service not available'
            })
        }
    }

}

export default Trip;