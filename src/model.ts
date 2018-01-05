export interface ApplicationInfo {
    appVersion: string;
    database: string;
    freeMem: string;
    javaVersion: string;
    os: string;
    scalaVersion: string;
    totalMem: string;
};

export interface LiveReading {
    elecCon: number;
    elecProd: number;
    gas: number;
    tariff: string;
    ts: string;
};

export interface Reading {
    electricityLow: number;
    electricityNormal: number;
    gas: number;
    recordDate: Date;
};

export interface RecentReading {
    elecCon: number;
    elecConsNormal: number;
    elecConsLow: number;
    elecProd: number;
    elecProdNormal: number;
    elecProdLow: number;
    gas: number;
    ts: string;
};
