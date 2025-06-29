import ActivityList from "@/components/activityList"
import CategoryList from "@/components/categoryList"

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-xl font-bold">Page 1</h1>
      <main className="flex flex-row gap-[32px] row-start-2 items-center sm:items-start">
        <CategoryList/>
        <ActivityList/>
      </main>
    </div>
  );
}
