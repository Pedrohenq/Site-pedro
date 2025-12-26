export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-secondary text-secondary-foreground py-8">
      <div className="container text-center text-sm">
        <p>&copy; {year} Belo Alimentos Corporativos. Todos os direitos reservados.</p>
        <p className="mt-2 text-secondary-foreground/70">CNPJ: 64.096.715/0001-72</p>
      </div>
    </footer>
  );
}
