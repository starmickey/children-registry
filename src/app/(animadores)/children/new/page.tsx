import Header, { ReturnButton } from "@/components/layout/header";
import CreateChildContainer from "@/features/children/components/CreateChildContainer";

export default async function Page() {
  return (
    <>
      <Header>
        <ReturnButton href="/children" />
      </Header>
      <main className="page-card sm:w-1/2 m-auto">
        <CreateChildContainer />
      </main>
    </>
  );
}
