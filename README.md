# iTsMedia


## Configuration
Download the latest version of materialize css and place it on public/materialize folder (if not present, make one).

Make a folder named files on `public/`.

Make a `.env` file on `/src` like the one showed below:
```env
PORT=YOUR_PORT
DB_USER=YOUR_USER
DB_PASSW=verysecretpassword
DB_NAME=YOUR_DB_NAME
DB_HOST=YOUR_HOST
DB_CONNECTION_LIMIT=10 #for example
```

Run `npm install` to install dependencies.

Run `npm run dev` for development.

Run `npm run test` for testing with jest.
