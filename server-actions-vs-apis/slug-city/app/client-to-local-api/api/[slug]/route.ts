import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server"
import { getSelectedSlugs } from "@/sql-api"

export const GET = async () => {
	return NextResponse.json(
		await getSelectedSlugs(auth().userId!)
	)
}