import Query from '../model/Query';

const bookings = new Query('bookings');
const trips = new Query('trips');
/**
 *@description Bookings of user {book}- to create, {bookings}- to veiw bookings and {deleteBooking}- to delete booking record
 */

class Bookings{
    /**
     * @description create booking for user
     * @param { Object } request 
     * @param { Object } response
     * @return { JSON } return  
     */
    static async book (request, response){
        try {
            const { seat_number, trip_id } = request.body;
            //check if trip is available 
            const checkTripID = await trips.select(['*'],[`id=${trip_id} AND status='active'`]);
            if(!checkTripID[0]){
                return response.status(404).json({
                    status: 404,
                    error: 'Trip ID does not match any of the available trip'
                })
            }
            const { bus_id, trip_date} = checkTripID[0];
            const { id, first_name, last_name, email } = request.userData;
            const bookData = {
                user_id: id,
                trip_id,
                bus_id,
                trip_date,
                seat_number,
                first_name,
                last_name,
                email
            }
            const data = await bookings.insert(Object.keys(bookData),[`'${id}','${trip_id}', '${bus_id}','${trip_date}','${seat_number}','${first_name}','${last_name}','${email}'`]);
            return response.status(201).json({
                status: 201,
                data,
                message: 'Your booking was successful'
            })
                
        } catch (error) {
            return response.status(503).json({
                status: 503,
                error: 'Something went wrong, service not available'
            });
        }

    }
     /**
     * @description view user booking, while is_admin true views all bookings
     * @param { Object } request 
     * @param { Object } response
     * @return { JSON } return  
     */
    static async bookings(request, response){
        try {
            if(request.userData.is_admin === false){
                const user_id = request.userData.id;
                const userBookings = await bookings.select(['*'], [`user_id=${user_id}`]);
                if(!userBookings[0]){
                    return response.status(404).json({
                        status: 404,
                        error: 'No booking record found'
                    })
                }
                return response.status(200).json({
                    status: 200,
                    data: userBookings,
                    message: 'Your bookings'
                })
            }
            const booking = await bookings.selectAll();
            return response.status(200).json({
                status: 200,
                data: booking
            })
        } catch (error) {
            return response.status(503).json({
                status: 503,
                error: 'Something went wrong, service not available'
            });   
        }
    }
    /**
     * @description delete booking 
     * @param { Object } request 
     * @param { Object } response
     * @return { JSON } return  
     */
    static async deleteBookings(request, response){
        try {
            const booking = await bookings.delete([`id='${request.params.bookingId}'`]);
            if(!booking.rowCount>0){
                return response.status(404).json({
                    status: 404,
                    error: 'Booking ID does not exist'
                })
            }
            return response.status(200).json({
                status: 204,
                message: 'Booking was successfully deleted'
            })
        } catch (error) {
            return response.status(503).json({
                status: 503,
                error: 'Something went wrong, service not available'
            });  
        }
    }
}

export default Bookings;