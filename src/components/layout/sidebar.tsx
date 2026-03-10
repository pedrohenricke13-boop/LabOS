import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default function Sidebar() {
  return (
    <aside
      style={{
        width: 220,
        minHeight: "100vh",
        background: "#0F2460",
        color: "white",
        padding: 20,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <h2>LabOS</h2>

        <nav style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 20 }}>
          <Link href="/dashboard" style={{ color: "white" }}>Dashboard</Link>
          <Link href="/equipments" style={{ color: "white" }}>Equipamentos</Link>
          <Link href="/agenda" style={{ color: "white" }}>Agenda</Link>
          <Link href="/reagents" style={{ color: "white" }}>Reagentes</Link>
          <Link href="/maintenance" style={{ color: "white" }}>Manutenção</Link>
          <Link href="/admin" style={{ color: "white" }}>Admin</Link>
        </nav>
      </div>

      <LogoutButton />
    </aside>
  );
}