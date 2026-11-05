import { CheckCircle2, Mail } from "lucide-react";

const TOTALS = [
  { label: "Charged", value: "$7,450" },
  { label: "Collected", value: "$5,600" },
  { label: "Owed", value: "$1,850", owed: true },
];

const LEASES = [
  { place: "Glebe Triplex · Unit 1", tenant: "Dana Whitfield", rent: "$1,850", owed: "$1,850" },
  { place: "Glebe Triplex · Unit 2", tenant: "Marc Tremblay", rent: "$1,700", owed: null },
  { place: "Elm Street Duplex · Unit A", tenant: "Priya Nair", rent: "$1,550", owed: null },
  { place: "Elm Street Duplex · Unit B", tenant: "Sam Okafor", rent: "$2,350", owed: null },
];

/** Decorative sketch of the rent overview. Sample data, hidden from assistive tech. */
export function HeroPreview() {
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-xl pb-28 pt-2">
      <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-primary/10 via-blue-100/50 to-transparent" />

      <div className="rounded-2xl border bg-white shadow-xl shadow-primary/10">
        <div className="flex items-center justify-between border-b px-5 py-3.5">
          <span className="text-sm font-semibold">Rent</span>
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
            Active leases
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3 p-5">
          {TOTALS.map((t) => (
            <div key={t.label} className="rounded-xl bg-slate-50 px-3.5 py-3">
              <div className="text-xs text-muted-foreground">{t.label}</div>
              <div
                className={`mt-0.5 text-xl font-bold tracking-tight ${t.owed ? "text-amber-600" : "text-foreground"}`}
              >
                {t.value}
              </div>
            </div>
          ))}
        </div>

        <ul className="divide-y border-t">
          {LEASES.map((l) => (
            <li key={l.place} className="flex items-center justify-between gap-4 px-5 py-3">
              <div className="min-w-0">
                <div className="truncate text-sm font-medium">{l.place}</div>
                <div className="truncate text-xs text-muted-foreground">{l.tenant}</div>
              </div>
              <div className="flex shrink-0 items-center gap-3 text-sm">
                <span className="text-muted-foreground">{l.rent}</span>
                {l.owed ? (
                  <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
                    Owes {l.owed}
                  </span>
                ) : (
                  <span className="flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-semibold text-green-700">
                    <CheckCircle2 className="h-3 w-3" />
                    Paid up
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="absolute bottom-0 -left-4 w-72 rounded-xl border bg-white p-4 shadow-xl shadow-primary/10">
        <div className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <Mail className="h-3.5 w-3.5" />
          Suggested payment
        </div>
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold">$1,850.00 from D. Whitfield</div>
            <div className="text-xs text-muted-foreground">Dana Whitfield, Unit 1</div>
          </div>
          <span className="shrink-0 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
            Confirm
          </span>
        </div>
      </div>
    </div>
  );
}
