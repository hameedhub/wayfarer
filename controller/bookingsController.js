import bookings from '../database/persistentData/bookings.json';
import trips from '../database/persistentData/trips.json';
class Bookings{

    static book (request, response){
        const { seat_number, trip_id } = request.body;
        //check if trip is available 
        const checkTripID = trips.find(trip => trip.trip_id === trip_id);
        if(!checkTripID){
            return response.status(404).json({
                status: 404,
                error: 'Trip ID does not match any of the available trip'
            })
        }
       const { bus_id, trip_date} = checkTripID;
        const { id, first_name, last_name, email, is_admin } = request.userData;
        const data = {
            booking_id: 1,
            user_id: id,
            trip_id,
            bus_id,
            trip_date,
            seat_number,
            first_name,
            last_name,
            email
        }
        bookings.push(data);
        return response.status(201).json({
            status: 201,
            data,
            message: 'Your booking was successful'
        })
    }
}

export default Bookings;