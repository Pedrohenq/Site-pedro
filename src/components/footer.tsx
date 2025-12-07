export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-secondary text-secondary-foreground py-8">
      <div className="container text-center text-sm">
        <p>&copy; {year} Belo Alimentos Corporativos. Todos os direitos reservados.</p>
        <p className="mt-2 text-secondary-foreground/70">CNPJ: 63.038.758/0001-39</p>
      </div>
    </footer>
  );
}
