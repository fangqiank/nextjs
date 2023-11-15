import { revalidatePath } from "next/cache";
import { RSCBlogList, ClientBlogList } from "ui";

export default async function Home() {
  return (
    <main className="mx-auto max-w-6xl mt-5">
      {/* <RSCBlogList  onSubmit={async () => {
        'use server'
        await revalidatePath('/')
      }}
      /> */}
      <ClientBlogList />
    </main>
  );
}
