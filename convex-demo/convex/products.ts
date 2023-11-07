import { query } from "./_generated/server";
import { asyncMap } from "./lib/relationships";

export const get = query(async ({ db, storage }) => {
  const products = await db.query("products").collect();
  
	return await asyncMap(products, async (prod) => ({
    ...prod,
    image: (await storage.getUrl(prod.imageId)) ?? "",
  }))
})
