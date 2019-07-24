import Query from '../model/Query';
import {isEmpty} from '../validation/Authentication';
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
            //check bus_id
            const busCheck = await bus.select(['*'],`id=${request.body.bus_id}`);
            if(!busCheck[0]){
                return response.status(404).json({
                    status: 404,
                    error: 'Bus Id not found'
                })
            }
            //check if bus is free
            const isBusFree = await trips.select([`bus_id, trip_date`], [`bus_id='${request.body.bus_id}' AND trip_date='${request.body.trip_date}'`]);
            console.log(isBusFree)
            if(isBusFree[0]){
                return response.status(409).json({
                    status: 409,
                    error: `Bus already set for a on the entered trip date: ${request.body.trip_date}`
                })
            }
            const tripData =  {...request.body, status: 'active'};
            const { bus_id, origin, destination, trip_date, fare, status } = tripData;
            const data = await trips.insert(['bus_id', 'origin', 'destination', 'trip_date', 'fare', 'status'],[`'${bus_id}', '${origin}', '${destination}', '${trip_date}', '${fare}', '${status}'`]);
            return response.status(201).json({
                status: 201,
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
     * @description Admin and user view trips
     * @param { Object } request 
     * @param { Object } response
     * @return { JSON } return  
     */
    static async viewTrip(request, response){
        try {
            if(isEmpty(request.query)){
                const data = await trips.selectAll();
                return response.status(200).json({
                    status: 200,
                    data
                }) 
            }
            if(request.query){
                if(request.query.destination){
                    const data = await trips.select(['*'], [`destination='${request.query.destination}'`]);
                    if(!data[0]){
                        return response.status(404).json({
                            status: 404,
                            error: `No available trip for ${request.query.destination} destination`
                        })
                    }
                    return response.status(200).json({
                        status: 200,
                        data,
                        message: `Trips available for ${request.query.destination} destination`
                    })
                } else if(request.query.origin){
                    const data = await trips.select(['*'], [`origin='${request.query.origin}'`]);
                    if(!data[0]){
                        return response.status(404).json({
                            status: 404,
                            error: `No available trip for ${request.query.origin} origin`
                        })
                    }
                    return response.status(200).json({
                        status: 200,
                        data,
                        message: `Trips available for ${request.query.origin} origin`
                    })     
                }else{
                    return response.status(403).json({
                        status: 403,
                        error: 'Invalid query parameter, you can only fliter by destination and origin'
                    })
                }
            }  
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
    static async editTrip(request, response){
        try {
            const requestObj = [request.body];
            if(!isEmpty(request.body.status)){
                if(request.body.status !='active' && request.body.status !='cancel'){
                    return response.status(422).json({
                        status: 422,
                        error: 'Status can only be active or cancel'
                    })
                }
            }
            //check bus_id
            const busCheck = await bus.select(['*'],[`id=${request.body.bus_id}`]);
            if(!busCheck[0]){
                return response.status(404).json({
                    status: 404,
                    error: 'Bus Id not found'
                })
            }
            //check if bus is free
            const isBusFree = await trips.select([`bus_id, trip_date`], [`bus_id='${request.body.bus_id}' AND trip_date='${request.body.trip_date}'`]);
            if(isBusFree[0]){
                return response.status(409).json({
                    status: 409,
                    error: `Bus already set for a on the entered trip date: ${request.body.trip_date}`
                })
            }
            let arrayRequest = [];
            requestObj.forEach(element => {
                Object.keys(element).forEach((e)=> {
                     let value = `${e} = '${element[e]}'`;
                     arrayRequest.push(value);
                  });
            });
            const result = await trips.update(`${arrayRequest}`, [`id='${request.params.tripId}'`]);
            if(!result[0]){
                return response.status(404).json({
                    status: 404,
                    error: 'Trip not found'
                })
            }
            const data = { ...result[0], message: 'Trip was successfully edited' }
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

}

export default Trip;