import { Database } from "firebase/database";
import { ICreateData, IDeleteData, IDeleteManyData, IGetList, IGetMany, IGetOne, IDatabaseOptions, IUpdateData, IUpdateManyData } from "./interfaces";
import { BaseDatabase } from "./Database";
export declare class FirebaseDatabase extends BaseDatabase {
    database: Database;
    constructor(options?: IDatabaseOptions, database?: Database);
    getRef(url: string): import("@firebase/database").DatabaseReference;
    createData<TVariables = {}>(args: ICreateData<TVariables>): Promise<any>;
    createManyData<TVariables = {}>(args: ICreateData<TVariables>): Promise<any>;
    deleteData(args: IDeleteData): Promise<any>;
    deleteManyData(args: IDeleteManyData): Promise<any>;
    getList(args: IGetList): Promise<any>;
    getMany(args: IGetMany): Promise<any>;
    getOne(args: IGetOne): Promise<any>;
    updateData<TVariables = {}>(args: IUpdateData<TVariables>): Promise<any>;
    updateManyData<TVariables = {}>(args: IUpdateManyData<TVariables>): Promise<any>;
}
