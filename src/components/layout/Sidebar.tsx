import Link from "next/link";

export default function Sidebar() {
  return (
    <aside
      style={{
        width: 220,
        background: "#0f172a",
        color: "white",
        padding: 20,
        minHeight: "100vh"
      }}
    >
      <h2 style={{ marginBottom: 20 }}>LabOS</h2>

      <nav style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/agenda">Agenda</Link>
        <Link href="/equipments">Equipamentos</Link>
        <Link href="/reagents">Reagentes</Link>
        <Link href="/maintenance">Manutenção</Link>
        <Link href="/admin">Admin</Link>
      </nav>
    </aside>
  );
}