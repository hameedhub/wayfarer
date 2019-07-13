import Encryptor from '../helper/encryptor';
const password = Encryptor.encrypt('Password124#');

const userTable =()=>{
    `CREATE TABLE IF NOT EXISTS
        users(
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(128) NOT NULL,
        last_name VARCHAR(128) NOT NULL,
        email VARCHAR (128) UNIQUE,
        password VARCHAR(128) NOT NULL,
        is_admin BOOLEAN NOT NULL
   );`
}
const seededUser =()=>{
    `INSERT INTO users (first_name, last_name, email, password, is_admin) VALUES('Test', 'User', 'test@mail.com', '${password}', false)`,
    `INSERT INTO users (first_name, last_name, email, password, is_admin) VALUES('Test', 'Admin, 'admin@mail.com', '${password}', true)`
}
const bookingTable =()=>{
    `CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        trip_id INT NOT NULL,
        bus_id INT NOT NULL,
        trip_date VARCHAR NOT NULL,
        seat_number INT NOT NULL,
        first_name VARCHAR NOT NULL,
        last_name VARCHAR NOT NULL,
        email VARCHAR NOT NULL
      );`
}
const tripsTable=()=>{
    `CREATE TABLE IF NOT EXISTS trips (
        id SERIAL PRIMARY KEY,
        bus_id INT NOT NULL,
        origin VARCHAR NOT NULL,
        destination VARCHAR NOT NULL,
        trip_date VARCHAR NOT NULL,
        fare NUMERIC NOT NULL,
        status VARCHAR NOT NULL
      );`
}
const busesTable=()=>{
    `CREATE TABLE IF NOT EXISTS buses (
        id SERIAL PRIMARY KEY,
        number_plate VARCHAR NOT NULL,
        manufacturer VARCHAR NOT NULL,
        model VARCHAR NOT NULL,
        year VARCHAR NOT NULL,
        capacity INT NOT NULL
      );`
}