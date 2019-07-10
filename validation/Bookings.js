import { isEmpty, isIntegar }  from './Authentication';

class BookingsValidation {
    static book(request, response, next){
        const { seat_number, trip_id } = request.body;
        //validation
        if(Object.keys(request.body).length > 2){
            return response.status(400).json({
                status: 400,
                error: 'Only seat number and trip id is required'
            })
        }
        if(isEmpty(seat_number) && isEmpty(trip_id)){
            return response.status(400).json({
                status: 400,
                error: 'Seat number and Trip ID is required'
            })
        }
        // validate seat_number
        if(isEmpty(seat_number)){
            return response.status(400).json({
                status: 400,
                error: 'Seat number is required'
            })
        }
        if(!isIntegar.test(seat_number)){
            return response.status(422).json({
                status: 422,
                error: 'Invalid seat number'
            })
        }
        // validate trip ID
        if(isEmpty(trip_id)){
            return response.status(400).json({
                status: 400,
                error: 'Trip ID is required'
            })
        }
        if(!isIntegar.test(trip_id)){
            return response.status(422).json({
                status: 422,
                error: 'Invalid trip ID'
            })
        }
        next();
    }
}
export default BookingsValidation;