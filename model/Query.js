import pool from '../database/dbConnection';
class Query{
    constructor(table){
        this.pool = pool;
        this.table = table;
    }
    async insert(keys, values){
       
        try {
            const response = await this.pool.query(`INSERT INTO ${this.table}(${keys}) VALUES(${values}) RETURNING *`);
            return response.rows;
        } catch (error) {
           return error;
        }
    }
    async select(parameter, constraint){
        try{
            const response = await this.pool.query(`SELECT ${parameter} FROM ${this.table} WHERE ${constraint}`);
            return response.rows;
        }catch(error){
            return error;
        }
    }
    async update(values, constraint){
        try {
            const response = await this.pool.query(`UPDATE ${this.table} SET ${values} WHERE ${constraint} RETURNING *`);
            return response.rows;
        } catch (error) {
            return error;
        }
    }
    async delete(constraint){
        try {
            const response = await this.pool.query(`DELETE FROM ${this.table} WHERE ${constraint}`);
            return response;
        } catch (error) {
            return error;
        }
    }
    async selectAll(){
        try {
            const response = await this.pool.query(`SELECT * FROM ${this.table}  ORDER BY id DESC`);
            return response.rows;
        } catch (error) {
            return error;
        }
    }
}

export default Query;