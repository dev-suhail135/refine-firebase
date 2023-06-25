import { Firestore, CollectionReference, DocumentData, Query } from "firebase/firestore";
import { ICreateData, IDeleteData, IDeleteManyData, IGetList, IGetMany, IGetOne, IDatabaseOptions, IUpdateData, IUpdateManyData } from "./interfaces";
import { BaseDatabase } from "./Database";
export declare class FirestoreDatabase extends BaseDatabase {
    database: Firestore;
    constructor(options?: IDatabaseOptions, database?: Firestore);
    getCollectionRef(resource: string): CollectionReference<DocumentData>;
    getDocRef(resource: string, id: string): import("@firebase/firestore").DocumentReference<DocumentData>;
    getFilterQuery({ resource, sort, filters }: IGetList): (CollectionReference<DocumentData> | Query<DocumentData>);
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
