import Dashboard from "./Dashboard/page";
import Header from "./components/Header";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <Dashboard />
      </main>
    </div>
  );
}
