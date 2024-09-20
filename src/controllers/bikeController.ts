import { Request, Response, NextFunction } from 'express';
import Bike from '../models/Bike';


// create part start
const createBike = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bike = new Bike(req.body);
    await bike.save();
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Bike added successfully',
      data: bike
    });
   } catch (error) {
    console.log(error)
    next(error);
  }   
};


const getBikeById = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const bike = await Bike.findById(req.params.id);
    if(!bike) {
      return res.status(404).json({
        success: false,
        message: 'Bike not found'
      });
    }
    res.json({
      success: true,
      statusCode: 200,
      message: 'Bike retrieved successfully',
      data: bike,
    });
  } catch(error) {
    next(error);
  }
}

// getAllBikes part start
const getAllBikes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {brand, model} = req.query;
    const filter: any = {};
    if(brand) filter.brand = brand;
    if(model) filter.model = model; 

    const bikes = await Bike.find(filter);
    if (bikes.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No Data Found',
        data: []
      });
    }
    res.json({
      success: true,
      statusCode: 200,
      message: 'Bikes retrieved successfully',
      data: bikes
    });
  } catch (error) {
    next(error);
  }
};

//update part start
const updateBike = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bike = await Bike.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({
      success: true,
      statusCode: 200,
      message: 'Bike updated successfully',
      data: bike
    });
  } catch (error) {
    next(error);
  }
};

// delete part start
const deleteBike = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bike = await Bike.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      statusCode: 200,
      message: 'Bike deleted successfully',
      data: bike
    });
  } catch (error) {
    next(error);
  }
};


const searchBikes = async (req: Request, res: Response) => {
  const searchQuery = req.query.q as string; 
 
  try {

      const bikes = await Bike.find({ name: new RegExp(searchQuery, 'i') });
      if (bikes.length === 0) {
          return res.json({ success: true, message: 'No bikes found', bikes: [] });
      }
      res.json({ success: true, bikes });
  } catch (err) {
      res.status(500).json({ success: false, error: err.message });
  }
};

export { createBike, getBikeById,getAllBikes, updateBike, deleteBike, searchBikes };


