const links = [
  { label: "Sobre", href: "#" },
  { label: "Contato", href: "#" },
  { label: "Termos", href: "#" },
  { label: "Privacidade", href: "#" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 md:flex-row md:justify-between">
        <span className="text-lg font-bold text-nutri-green">NutriMatch</span>
        <nav className="flex flex-wrap justify-center gap-6">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-nutri-muted transition-colors hover:text-nutri-text"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <p className="text-sm text-nutri-muted">
          {"© 2025 NutriMatch. Todos os direitos reservados."}
        </p>
      </div>
    </footer>
  );
}
