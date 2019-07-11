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
            booking_id: bookings.length+1,
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
    static bookings(request, response){
        if(request.userData.is_admin === false){
            const user_id = request.userData.id;
            const userBookings = bookings.filter(book => book.user_id === user_id);
            return response.status(200).json({
                status: 200,
                data: userBookings,
                message: 'Your bookings'
            })
        }
        return response.status(200).json({
            status: 200,
            data: bookings
        })
    }
    static deleteBookings(request, response){
        const booking_id = request.params.bookingId;
        const booking = bookings.find(book=>book.booking_id === +booking_id);
        if(!booking){
            return response.status(404).json({
                status: 404,
                error: 'Booking ID does not exist'
            })
        }
        const bookIndex = bookings.indexOf(booking);
        bookings.splice(bookIndex, 1);
        return response.status(200).json({
            status: 204,
            message: 'Booking was successfully deleted'
        })

    }
}

export default Bookings;