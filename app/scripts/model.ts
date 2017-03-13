export interface ApplicationInfo {
    appVersion: string,
    database: string,
    freeMem: string,
    javaVersion: string,
    os: string,
    scalaVersion: string,
    totalMem: string
};

export interface Reading {
    electricityLow: number,
    electricityNormal: number,
    gas: number,
    recordDate: Date,
};