"use client"

import { ReactNode } from "react"
import { ConvexProvider, ConvexReactClient } from "convex/react"

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export const Provider = ({
  children,
}: {
  children: ReactNode;
}) => (
  <ConvexProvider client={convex}>{children}</ConvexProvider>
)
