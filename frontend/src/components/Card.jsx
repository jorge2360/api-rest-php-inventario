function Card({ title, children }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {title && <h2 className="mb-4 text-xl font-semibold text-slate-800">{title}</h2>}
      {children}
    </section>
  )
}

export default Card