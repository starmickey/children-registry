import Header, { ReturnButton } from "@/components/layout/header";
import CreateChildContainer from "@/features/children/components/CreateChildContainer";

export default async function Page() {
  return (
    <main className="page">
      <Header>
        <ReturnButton href="/children" />
      </Header>
      <CreateChildContainer />
    </main>
  );
}
