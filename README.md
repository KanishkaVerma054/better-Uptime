## Todo:

1. Initialize Turborepo
2. Create a node.js backend with express, exposes 1 ep
3. add prisma to it
    (for rust backend add deisel or sqlx to the rust backend,
    make sure the logic is added in the store crate)
4. Decide the queue you'll use(SQS, nats, redis streams, kafka)
5. Create the publisher
6. Create the worker
7. Use timeseriesDB (or clickhouse) to shove timeseries data
