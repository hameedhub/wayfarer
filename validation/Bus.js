import { isEmpty, isIntegar } from '../validation/Authentication';
import { isString } from '../validation/Trip';


class BusValidation{
    static createBus(request, response, next){
        const { number_plate, manufacturer, model, year, capacity } = request.body;

        if(Object.keys(request.body).length >5){
            return response.status(400).json({
                status: 400,
                error: 'Only number plate, manufacturer, model, year and capacity is required'
            })
        }
        if(isEmpty(number_plate) && isEmpty(manufacturer) && isEmpty(model) && isEmpty(year) && isEmpty(capacity)){
            return response.status(400).json({
                status: 400,
                error: 'Number plate, manufacturer, model, year and capacity is required'
            })
        }
        // validate number plate
        if(isEmpty(number_plate)){
            return response.status(400).json({
                status: 400,
                error: 'Number Plate is required'
            })
        }
        if(!isString.test(number_plate)){
            return response.status(422).json({
                status: 422,
                error: 'Invalid plate number, plate number should not contain invalid symbols and should be more than 2 characters'
            })
        }
        // validate manufacturer
        if(isEmpty(manufacturer)){
            return response.status(400).json({
                status: 400,
                error: 'Manufacturer is required'
            })
        }
        if(!isString.test(manufacturer)){
            return response.status(422).json({
                status: 422,
                error: 'Manufacturer should not contain invalid symbols and should be more than 2 characters'
            })
        }
        // validate model
        if(isEmpty(model)){
            return response.status(400).json({
                status: 400,
                error: 'Model is required'
            })
        }
        if(!isString.test(model)){
            return response.status(422).json({
                status: 422,
                error: 'Model should not contain invalid symbols and must be more than 2 characters'
            })
        }
        // validate year
        if(isEmpty(year)){
            return response.status(400).json({
                status: 400,
                error: 'Year is required'
            })
        }
        if(!isIntegar.test(year)){
            return response.status(422).json({
                status: 422,
                error: 'Invalid input, year can only be number (e.g 2019)'
            })
        }
        // validate capacity
        if(isEmpty(capacity)){
            return response.status(400).json({
                status: 400,
                error: 'Capacity is required'
            })
        }
        if(!isIntegar.test(capacity)){
            return response.status(422).json({
                status: 422,
                error: 'Invalid input, capacity can only be an number'
            })
        }
        next();
    }
}

export default BusValidation;