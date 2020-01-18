import { Sequelize } from 'sequelize-typescript';
import { AbstractDataTypeConstructor } from 'sequelize';
import { IConfig } from '../config';

export interface ITableMetadata {
    name: string;
    timestamps?: boolean;
    columns: IColumnMetadata[];
}

export interface IColumnMetadata {
    name: string;
    type: string;
    typeExt: string;
    // dataType: DataType;
    primaryKey: boolean;
    // foreignKey: boolean;
    allowNull: boolean;
    // unique: boolean;
    autoIncrement: boolean;
    // default?: ;
}

export abstract class Dialect {

    /**
     * Accepted dialects
     */
    public static dialects: Set<string> = new Set([
        'postgres',
        'mysql',
        'mariadb',
        'sqlite',
        'mssql',
    ]);

    /**
     * Maps dialect data type to sequelize data type
     */
    public abstract readonly sequelizeDataTypesMap: { [key: string]: AbstractDataTypeConstructor };

    /**
     * Maps dialect type to javascript type
     */
    public abstract readonly jsDataTypesMap: { [key: string]: string };

    /**
     * Extract tables metadata for the specific dialect and schema
     * @param {IConfig} config
     * @returns {Promise<ITableMetadata[]>}
     */
    public abstract async fetchMetadata(config: IConfig): Promise<ITableMetadata[]>
}
