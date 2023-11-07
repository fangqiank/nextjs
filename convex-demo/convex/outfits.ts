import { mutation, query } from "./_generated/server"
import {v} from 'convex/values'
import { asyncMap, getAll } from "./lib/relationships";

export const get = query(async ({ db, storage }) => {
  const outfits = await db.query('outfits').order('desc').take(10)
  
	return await asyncMap(outfits, async (outfit) => {
    const products = await getAll(db, outfit.products)

		return {
			...outfit,
			products: await asyncMap(products, async prod => ({
				...prod,
				image: await storage.getUrl(prod?.imageId ?? '')
			}))
		}
	})
})

export const add = mutation({
	args:{
		title: v.string(),
    products: v.array(v.id('products'))
	},

	handler:async ({db}, {title, products}) => {
		await db.insert('outfits', {
			products,
			title
		})
	}
})
