import { Endpoint } from "../models/endpoint";

export const GLOBAL = {
    apiVersion : '2.2.0',
    apiRequirements: ['name','version','api_routes'],
    apiDefault: new Endpoint('Joutes CPNV', 'http://joutes.test/api')
}
