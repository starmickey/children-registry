import Image from "next/image";

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <main className="container flex flex-col justify-center items-center h-screen">
      <Image
        src="/icon0.svg"
        className="w-1/3"
        width={200}
        height={200}
        alt="Cargando..."
      />
      <div className="text-muted-foreground font-bold uppercase mt-6 animate-pulse">
        Cargando...
      </div>
    </main>
  );
}
