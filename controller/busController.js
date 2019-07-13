import Query from '../model/Query';

const bus = new Query('buses');
/**
 * @description Bus profiling 
 */
class Bus {
   /**
     * @description creation of bus profile
     * @param { Object } request 
     * @param { Object } response
     * @return { JSON } return  
     */
    static async createBus(request, response){
      try {
          const { number_plate, manufacturer, model, year, capacity } = request.body;
          const busData ={
              number_plate,
              manufacturer,
              model,
              year,
              capacity
          };
          const data = await bus.insert(Object.keys(busData),[`'${number_plate}','${manufacturer}','${model}','${year}','${capacity}'`]);
          return response.status(201).json({
            status: 201,
            data,
            message: 'Bus profile was created successfully'
          })
             
        } catch (error) {
            return response.status(503).json({
              status: 503,
              error: 'Something went wrong, service not available'
            })
        }
    }
    /**
     * @description get buses with details
     * @param { Object } request 
     * @param { Object } response
     * @return { JSON } return  
     */
    static async getBuses(request, response){
      try {
          const data = await bus.selectAll();
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

export default Bus;