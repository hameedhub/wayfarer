import { isEmpty, isIntegar } from './Authentication';
const isString = /^([a-zA-Z 0-9_\-\.]{2,})$/; // checks if the user input is string value
const isValidDate = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
//isValidDate from J. Meijer stackoverflow
const isValidFloat = /^-?\d*(\.\d+)?$/; //stackoverflow user - mkedobbs
/**
 * @description Validate trip inputs
 * @param { Object } request 
 * @param { Object } response
 * @return { error, status } - error message and status code 
 */
class TripValidation {
    
    static createTripValidation(request, response, next){

    const {bus_id, origin, destination, trip_date, fare} = request.body;
        //check if input is not more than the required values
        if(Object.keys(request.body).length > 5){
            return response.status(400).json({
                status: 400,
                error: 'Only Bus ID, Origin, Destination, Trip Date and Fare is required'
            })
        }
        // check if any of the field is empty
        if(isEmpty(bus_id) && isEmpty(origin) && isEmpty(destination) && isEmpty(trip_date) && isEmpty(fare)){
            return response.status(400).json({
                status: 400,
                error: 'Bus ID, Origin, Destination, Trip Date and Fare is required'
            })
        }
        // validate Bus ID
        if(isEmpty(bus_id)){
            return response.status(400).json({
                status: 400,
                error: 'Bus ID is required'
            })
        }
        if(!isIntegar.test(bus_id)){
            return response.status(422).json({
                status: 422,
                error: 'Bus ID should be Number'
            })
        }
        // validate origin
        if(isEmpty(origin)){
            return response.status(400).json({
                status: 400,
                error: 'Origin is required'
            })
        }
        if(!isString.test(origin)){
            return response.status(422).json({
                status: 422,
                error: 'Origin should contain valid character and should be more than 2'
            })
        }
        // validate destination
        if(isEmpty(destination)){
            return response.status(400).json({
                status: 400,
                error: 'Destination is required'
            })
        }
        if(!isString.test(destination)){
            return response.status(422).json({
                status: 422,
                error: 'Destination should contain valid character and should be more than 2'
            })
        }
        // validate date
        if(isEmpty(trip_date)){
            return response.status(400).json({
                status: 400,
                error: 'Trip date is required'
            })
        }
        if(!isValidDate.test(trip_date)){
            return response.status(422).json({
                status: 422,
                error: 'Invalid Date(e.g day/month/year )'
            })
        }
        // validate fare
        if(isEmpty(fare)){
            return response.status(400).json({
                status: 400,
                error: 'Fare is required'
            })
        }
        if(!isValidFloat.test(fare)){
            return response.status(422).json({
                status: 422,
                error: 'Fare should can only be number or float value'
            })
        }
    next();
    }
}

export default TripValidation;