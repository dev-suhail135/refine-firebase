import { DataProvider } from "@refinedev/core";
import { IDatabaseOptions } from "./interfaces";
export declare abstract class BaseDatabase {
    private options?;
    constructor(options?: IDatabaseOptions);
    requestPayloadFactory(resource: string, data: any): any;
    responsePayloadFactory(resource: string, data: any): any;
    abstract createData(args: any): Promise<any>;
    abstract createManyData(args: any): Promise<any>;
    abstract deleteData(args: any): Promise<any>;
    abstract deleteManyData(args: any): Promise<any>;
    abstract getList(args: any): Promise<any>;
    abstract getMany(args: any): Promise<any>;
    abstract getOne(args: any): Promise<any>;
    abstract updateData(args: any): Promise<any>;
    abstract updateManyData(args: any): Promise<any>;
    getAPIUrl(): string;
    getDataProvider(): DataProvider;
}
