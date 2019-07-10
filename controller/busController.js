import bus from '../database/persistentData/bus.json';
class Bus {

    static createBus(request, response){
      const { number_plate, manufacturer, model, year, capacity } = request.body;
      const data ={
          id: bus.length+1,
          number_plate,
          manufacturer,
          model,
          year,
          capacity
      };
      bus.push(data);
      return response.status(201).json({
        status: 201,
        data
      })
    }
    static getBuses(request, response){
      return response.status(200).json({
        status: 200,
        data: bus
      })
    }
}

export default Bus;