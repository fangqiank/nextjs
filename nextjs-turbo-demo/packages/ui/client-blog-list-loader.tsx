import { createClient } from "@libsql/client";
import { ClientBlogList } from "./client-blog-list";
import type { BlogItem } from "./types"

const client = createClient({
  url: process.env.TURSO_URL!,
  authToken: process.env.TURSO_TOKEN!,
});

export const ClientBlogListLoader = async () => {
  const { rows } = await client.execute("SELECT * FROM blogs");

  const postBlog = async (title: string, body: string) => {
    "use server"
    
    await client.execute({
      sql: "INSERT INTO blogs (title, body) VALUES ($title, $body)",
      args: {
        title,
        body,
      },
    })
    const { rows: updatedRows } = await client.execute("SELECT * FROM blogs")
    return updatedRows as unknown as BlogItem[];
  }

  return (
    <ClientBlogList onSubmit={postBlog} rows={rows as unknown as BlogItem[]} />
  );
}
