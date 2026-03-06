import { cn } from "@/lib/utils";

interface Feature41Props {
  className?: string;
}

const Feature41 = ({ className }: Feature41Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid gap-10 md:grid-cols-5 md:gap-0">
          <h2 className="col-span-2 text-4xl font-semibold lg:text-5xl">
            Get Started
          </h2>
          <div className="col-span-3 grid gap-10 sm:grid-cols-2">
            <div>
              <div className="h-5 w-7 rounded-sm bg-red-600"></div>
              <h3 className="my-2 text-xl font-semibold">Lisbon, Portugal</h3>
              <p className="text-muted-foreground">
                Exemplo de rua 2 <br /> 1000-100 Lisboa
              </p>
            </div>
            <div>
              <div className="h-5 w-7 rounded-sm bg-green-600"></div>
              <h3 className="my-2 text-xl font-semibold">Rome, Italy</h3>
              <p className="text-muted-foreground">
                Esempio di strada 2 <br /> 00042 Roma
              </p>
            </div>
            <div>
              <div className="h-5 w-7 rounded-sm bg-blue-600"></div>
              <h3 className="my-2 text-xl font-semibold">Paris, France</h3>
              <p className="text-muted-foreground">
                Exemple de rue 2 <br /> 75000 Paris
              </p>
            </div>
            <div>
              <div className="h-5 w-7 rounded-sm bg-amber-600"></div>
              <h3 className="my-2 text-xl font-semibold">Madrid, Spain</h3>
              <p className="text-muted-foreground">
                Ejemplo de calle 2 <br /> 28000 Madrid
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature41 };
