# CodeX Accounting
Microservice for accounting📋

## How to run accounting service

1. Copy and rename file `.env.sample` to `.env`.
2. Add information about cashbook and revenue to `.env` file:

    Example:
    ```dotenv
    # Accounting Cashbook account identifier
    CASHBOOK_ACCOUNT_ID=#Your UUIDv4 cashbook account ID
    CASHBOOK_ACCOUNT_NAME="Hawk Cashbook account"

    # Accounting Revenue account identifier
    REVENUE_ACCOUNT_ID=#Your UUIDv4 revenue account ID
    REVENUE_ACCOUNT_NAME="Hawk Revenue account"
    ```
3. Install dependencies by `yarn install`.
4. Run accounting service by `yarn dev` or `yarn docker:up` commands.
5. Run MongoDB migrations by `yarn migrate:up`.

    You will see a message like this:
    ```text
    yarn run v1.21.1
    $ migrate-mongo up
    MIGRATED UP: 20200724163828-base-accounts.js
    Done in 1.26s.
    ```

🎉Now you can use accounting service in your projects🎉
