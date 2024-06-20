import express, {Request, Response} from "express";
const app = express()


app.get('/', (req: Request, res: Response) => {
  res.send('Hello World this!')
})

// Root route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the Bike Rental Reservation System Backend",
  });
});

export default app;
