import sql from '../../lib/db'
import { GasRecord } from "../../lib/types";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<GasRecord[]| {message: unknown}>
) {
  if (req.method === "GET") {
    try {
      const queryResult = await sql<GasRecord[]>`
        SELECT * FROM gas_consumption
      `;
      res.status(200).json(queryResult)
    } catch (err) {
      res.status(500).json({message: err})
    }
  }
  if (req.method === "POST") {
    try {
      const data = req.body;
      const {distance, litres, price} = data;
      const queryResult = await sql`
        INSERT INTO gas_consumption (distance, litres, price, created_on) VALUES (${distance}, ${litres}, ${price}, current_timestamp)
      `;
      res.status(200)
    } catch (err) {
      res.status(500).json({message: err})
    }
  }
  res.status(404)
};
