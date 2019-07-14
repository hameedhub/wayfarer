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
    static deleteBookings(request, response, next){
        const { bookingId } = request.params;
        if(Object.keys(request.body).length>0){
            return response.status(400).json({
                status: 400,
                error: 'Only bookingId required, and should be passed as a params'
            })
        }
        if(!isIntegar.test(bookingId)){
            return response.status(422).json({
                status: 422,
                error: 'Invalid input, booking ID should be a number'
            })
        }
        next();
    }
    static changeSeat(request, response, next){
        const { tripId } = request.params;
        const { seat_number } = request.body;
        if(!isIntegar.test(tripId)){
            return response.status(422).json({
                status: 422,
                error: 'Invalid input, Trip ID should be a number'
            })
        }
        if(Object.keys(request.body).length>1){
            return response.status(400).json({
                status: 400,
                error: 'Only seat number required'
            })
        }
        if(isEmpty(seat_number)){
            return response.status(400).json({
                status: 400,
                error: 'Seat number is required'
            })
        }
        if(!isIntegar.test(seat_number)){
            return response.status(422).json({
                status: 422,
                error: 'Invalid input, Seat number should be a number'
            })
        }
        next();
    }
}
export default BookingsValidation;