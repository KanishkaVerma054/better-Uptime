export const REGION_ID = process.env.REGION_ID!;
export const WORKER_ID = process.env.WORKER_ID!;

if(!REGION_ID) {
    throw new Error("Region not provided")
}

if(!WORKER_ID) {
    throw new Error("Worker not provided")
}