import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);

/**
 * @description Encrypt data and compare
 */
class Encryptor{
    /**
     * @description Encryt user data passed as parameter
     * @param { Object } data 
     * @return { String } encryted data
     */
    static encrypt (data){
        const encryted = bcrypt.hashSync(data, salt); 
        return encryted;
    }

    static compare (compare, hash){
        /**
         * @description
         * @param { compare } data to compare
         * @param { hash } data hash to compare with
         */
        const decrypted = bcrypt.compareSync(compare, hash);
        return decrypted;
    }
}

export default Encryptor;