import crypto from "crypto";
import { Database } from "./Database";

export class Account {
    account_id: string;
    name: string;
    email: string;
    cpf: string;
    car_plate: string;
    is_passenger: boolean;
    is_driver: boolean;

    constructor(account_id: string, name: string, email: string, cpf: string, car_plate: string, is_passenger: boolean, is_driver: boolean) {
        this.account_id = account_id;
        this.name = name;
        this.email = email;
        this.cpf = cpf;
        this.car_plate = car_plate;
        this.is_driver = is_driver;
        this.is_passenger = is_passenger;
    }

    static async findByEmail(emailFilter: string) {
        const queryResponse: Array<any> = await Database.query("select * from cccat16.account where email = $1", [emailFilter]);
        if (queryResponse.length === 0) return undefined;
        const [account_id, name, email, cpf, car_plate, is_passenger, is_driver] = queryResponse;
        return new Account(account_id, name, email, cpf, car_plate, is_passenger, is_driver);
    }

    static create(name: string, email: string, cpf: string, car_plate: string, is_passenger: boolean, is_driver: boolean) {
        const account_id = crypto.randomUUID();
        return new Account(account_id, name, email, cpf, car_plate, is_passenger, is_driver);
    }

    async save() {
        const queryResponse = await Database.query("insert into cccat16.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver) values ($1, $2, $3, $4, $5, $6, $7)",
            [this.account_id, this.name, this.email, this.cpf, this.car_plate, Boolean(this.is_passenger), Boolean(this.is_driver)]);
    }
}