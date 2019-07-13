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
            const checkBus = await bus.select(['*'], `id='${request.body.bus_id}'`);
            if(!checkBus[0]){
                return response.status(404).json({
                    status: 404,
                    error: `Bus ID not found, no bus profile created with ID ${request.body.bus_id}`
                })

            }
            const { bus_id, origin, destination, trip_date, fare } = tripData;
            const data = await trips.insert(Object.keys(tripData),[`'${bus_id}', '${origin}', '${destination}', '${trip_date}', '${fare}', 'active'`]);
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

}

export default Trip;