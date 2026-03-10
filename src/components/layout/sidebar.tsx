import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default function Sidebar() {
  return (
    <aside
      style={{
        width: 240,
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
        <h2 style={{ marginBottom: 24 }}>LabOS</h2>

        <nav style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Link href="/dashboard" style={{ color: "white", textDecoration: "none" }}>
            Dashboard
          </Link>

          <Link href="/agenda" style={{ color: "white", textDecoration: "none" }}>
            Agenda
          </Link>

          <Link href="/equipments" style={{ color: "white", textDecoration: "none" }}>
            Equipamentos
          </Link>

          <Link href="/reagents" style={{ color: "white", textDecoration: "none" }}>
            Reagentes
          </Link>

          <Link href="/maintenance" style={{ color: "white", textDecoration: "none" }}>
            Manutenção
          </Link>

          <Link href="/admin" style={{ color: "white", textDecoration: "none" }}>
            Admin
          </Link>
        </nav>
      </div>

      <LogoutButton />
    </aside>
  );
}