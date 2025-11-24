import React, { useState } from 'react';

// Xperience single-file React component (Tailwind-ready)
// Default export component renders a landing page with: Hero, Passes (1h,2h,Day), Memberships (Básica, Elite), Horario, FAQ,
// a simple cart and checkout form (mock — replace payment handler with your provider), and responsive layout.

export default function XperienceLanding() {
  const passes = [
    { id: 'p1', title: 'Pase 1 hora', price: 250, description: 'Acceso a las atracciones por 1 hora.' },
    { id: 'p2', title: 'Pase 2 horas', price: 350, description: 'Disfruta 2 horas de atracciones sin límite.' },
    { id: 'p3', title: 'Pase día', price: 400, description: 'Pase por todo el día (10:00–21:00).' },
  ];

  const memberships = [
    { id: 'm1', title: 'Membresía Básica', price: 599, benefits: ['2 entradas de 1h al mes', '10% descuento en merch'] },
    { id: 'm2', title: 'Membresía Elite', price: 799, benefits: ['Entradas ilimitadas (sujeto a políticas)', 'Prioridad en filas', '20% en consumos'] },
  ];

  const [cart, setCart] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [customer, setCustomer] = useState({ name: '', email: '', phone: '' });

  function addToCart(item, qty = 1) {
    setCart(prev => {
      const found = prev.find(p => p.id === item.id && p.type === item.type);
      if (found) return prev.map(p => p.id === item.id && p.type === item.type ? { ...p, qty: p.qty + qty } : p);
      return [...prev, { ...item, qty, type: item.type }];
    });
  }

  function removeFromCart(id, type) {
    setCart(prev => prev.filter(p => !(p.id === id && p.type === type)));
  }

  function cartTotal() {
    return cart.reduce((s, it) => s + it.qty * it.price, 0);
  }

  function handleCheckout(e) {
    e.preventDefault();
    // Mock checkout — replace with real payment integration
    alert(`Pedido recibido. \nNombre: ${customer.name}\nEmail: ${customer.email}\nTotal: $${cartTotal().toFixed(2)}`);
    setCart([]);
    setShowCheckout(false);
    setCustomer({ name: '', email: '', phone: '' });
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      <header className="bg-white shadow sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-indigo-500 to-emerald-400 rounded-full flex items-center justify-center text-white font-bold">X</div>
            <div>
              <h1 className="text-lg font-bold">Xperience Tepic</h1>
              <p className="text-xs text-slate-500">Diversión, deporte y aventura</p>
            </div>
          </div>
          <nav className="hidden md:flex gap-6 items-center text-sm">
            <a href="#pases" className="hover:underline">Pases</a>
            <a href="#membresias" className="hover:underline">Membresías</a>
            <a href="#horario" className="hover:underline">Horario</a>
            <a href="#faq" className="hover:underline">Preguntas</a>
            <button onClick={() => setShowCheckout(true)} className="px-3 py-1 rounded-md border">Carrito ({cart.length})</button>
          </nav>
          <div className="md:hidden">
            <button onClick={() => setShowCheckout(true)} className="px-3 py-1 rounded-md border">Carrito ({cart.length})</button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-4xl font-extrabold">Vive la aventura en Xperience</h2>
            <p className="mt-4 text-slate-700">Atracciones para niños y jóvenes, zonas deportivas, Ninja Warrior, cancha multiusos y actividades recreativas. Compra pases por hora o el pase del día y únete a nuestras membresías.</p>
            <div className="mt-6 flex gap-3 flex-wrap">
              <a href="#pases" className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow">Comprar Pases</a>
              <a href="#membresias" className="px-4 py-2 border rounded-md">Ver Membresías</a>
            </div>
            <div className="mt-6 text-sm text-slate-500">
              <strong>Horario general:</strong> 10:00 — 21:00 (todos los días).<br />Dirección: Tepic, Nayarit. Tel: (xxx) xxx-xxxx
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-xl font-semibold">Reserva rápida</h3>
            <p className="text-sm text-slate-600 mt-2">Selecciona un pase y agrégalo al carrito.</p>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {passes.map(p => (
                <div key={p.id} className="border rounded-lg p-3">
                  <h4 className="font-bold">{p.title}</h4>
                  <p className="text-sm text-slate-600">{p.description}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-lg font-bold">${p.price}</div>
                    <button onClick={() => addToCart({ id: p.id, title: p.title, price: p.price, type: 'pase' })} className="px-3 py-1 bg-emerald-500 text-white rounded">Agregar</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pases" className="mt-12">
          <h3 className="text-2xl font-bold">Pases por tiempo</h3>
          <p className="mt-2 text-slate-600">Compra el pase que más te convenga. Los pases comienzan a contar desde la entrada al área de atracciones.</p>

          <div className="mt-6 grid sm:grid-cols-3 gap-6">
            {passes.map(p => (
              <div key={p.id} className="bg-white rounded-2xl p-6 shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xl font-bold">{p.title}</h4>
                    <p className="text-slate-600 text-sm mt-1">{p.description}</p>
                  </div>
                  <div className="text-2xl font-extrabold">${p.price}</div>
                </div>
                <ul className="mt-4 text-sm text-slate-600 space-y-1">
                  <li>Acceso a las zonas incluidas</li>
                  <li>Condiciones sujetas a disponibilidad</li>
                </ul>
                <div className="mt-4 flex gap-3">
                  <button onClick={() => addToCart({ id: p.id, title: p.title, price: p.price, type: 'pase' })} className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded">Agregar al carrito</button>
                  <a href="#" className="px-4 py-2 border rounded">Más info</a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="membresias" className="mt-12">
          <h3 className="text-2xl font-bold">Membresías mensuales</h3>
          <p className="mt-2 text-slate-600">Beneficios exclusivos para miembros. Selecciona la que prefieras.</p>

          <div className="mt-6 grid sm:grid-cols-2 gap-6">
            {memberships.map(m => (
              <div key={m.id} className="bg-white rounded-2xl p-6 shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xl font-bold">{m.title}</h4>
                    <p className="text-slate-600 text-sm mt-1">Beneficios:</p>
                    <ul className="mt-2 text-sm list-disc list-inside text-slate-600">
                      {m.benefits.map((b, i) => <li key={i}>{b}</li>)}
                    </ul>
                  </div>
                  <div className="text-2xl font-extrabold">${m.price}</div>
                </div>
                <div className="mt-4 flex gap-3">
                  <button onClick={() => addToCart({ id: m.id, title: m.title, price: m.price, type: 'membresia' })} className="flex-1 px-4 py-2 bg-emerald-500 text-white rounded">Suscribirme</button>
                  <a href="#" className="px-4 py-2 border rounded">Detalles</a>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-4 text-sm text-slate-500">Nota: Las membresías se cobran mensualmente. Contacta a nuestro equipo para políticas de uso y limitaciones.</p>
        </section>

        <section id="horario" className="mt-12 bg-white rounded-2xl p-6 shadow">
          <h3 className="text-2xl font-bold">Horario general</h3>
          <p className="mt-2 text-slate-700">Abrimos todos los días de la semana.</p>
          <div className="mt-4 flex items-center gap-6">
            <div className="p-4 bg-slate-50 rounded">
              <div className="text-sm text-slate-500">Horario</div>
              <div className="text-2xl font-bold">10:00 — 21:00</div>
            </div>
            <div>
              <div className="text-sm text-slate-500">Atención a clientes</div>
              <div className="text-lg">(xxx) xxx-xxxx • hola@xperience.mx</div>
            </div>
          </div>
        </section>

        <section id="faq" className="mt-12">
          <h3 className="text-2xl font-bold">Preguntas frecuentes</h3>
          <div className="mt-4 grid sm:grid-cols-2 gap-4">
            <details className="bg-white p-4 rounded shadow">
              <summary className="font-semibold">¿Qué incluye un pase?</summary>
              <p className="mt-2 text-slate-600">Los pases incluyen acceso a las atracciones señaladas en el mapa y las áreas activas. Algunas atracciones especiales pueden requerir pago adicional.</p>
            </details>
            <details className="bg-white p-4 rounded shadow">
              <summary className="font-semibold">¿Puedo cambiar la fecha o hora?</summary>
              <p className="mt-2 text-slate-600">Los pases son válidos para la fecha y hora de compra. Para cambios comunícate con nuestro equipo de atención al cliente.</p>
            </details>
            <details className="bg-white p-4 rounded shadow">
              <summary className="font-semibold">Política de reembolso</summary>
              <p className="mt-2 text-slate-600">Reembolsos sujetos a revisión. Contacta soporte con tu comprobante.</p>
            </details>
            <details className="bg-white p-4 rounded shadow">
              <summary className="font-semibold">¿Qué es la Membresía Elite?</summary>
              <p className="mt-2 text-slate-600">La Membresía Elite ofrece prioridad en filas, descuentos y acceso preferencial a actividades sujetas a cupo.</p>
            </details>
          </div>
        </section>

        <section className="mt-12 bg-white rounded-2xl p-6 shadow">
          <h3 className="text-xl font-bold">Contacto y ubicaciones</h3>
          <p className="mt-2 text-slate-600">Estamos en Tepic, Nayarit. Para grupos escolares o eventos especiales solicita cotización al correo.</p>
          <form className="mt-4 grid sm:grid-cols-3 gap-3" onSubmit={(e) => { e.preventDefault(); alert('Gracias, nos pondremos en contacto.'); }}>
            <input placeholder="Nombre" className="p-3 border rounded" required />
            <input placeholder="Email" type="email" className="p-3 border rounded" required />
            <input placeholder="Teléfono" className="p-3 border rounded" />
            <textarea placeholder="Mensaje" className="p-3 border rounded col-span-full" rows={4} />
            <button className="px-4 py-2 bg-indigo-600 text-white rounded col-span-full">Enviar</button>
          </form>
        </section>

      </main>

      <footer className="bg-slate-900 text-slate-100 mt-12">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between">
          <div>
            <h4 className="font-bold">Xperience Tepic</h4>
            <p className="text-sm text-slate-400 mt-2">10:00 — 21:00 • Tepic, Nayarit</p>
          </div>
          <div className="mt-4 md:mt-0 text-sm text-slate-400">© {new Date().getFullYear()} Xperience. Todos los derechos reservados.</div>
        </div>
      </footer>

      {/* Checkout modal / drawer */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/40 z-30 flex items-end md:items-center justify-center">
          <div className="bg-white w-full md:w-3/4 lg:w-1/2 rounded-t-2xl md:rounded-2xl p-6 max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between">
              <h4 className="text-xl font-bold">Carrito</h4>
              <button onClick={() => setShowCheckout(false)} className="text-slate-500">Cerrar</button>
            </div>
            <div className="mt-4">
              {cart.length === 0 ? (
                <p className="text-slate-600">Tu carrito está vacío. Agrega pases o membresías.</p>
              ) : (
                <div className="space-y-4">
                  {cart.map((it, idx) => (
                    <div key={idx} className="flex items-center justify-between border rounded p-3">
                      <div>
                        <div className="font-semibold">{it.title} {it.type === 'membresia' && <span className="text-sm text-slate-500">(mensual)</span>}</div>
                        <div className="text-sm text-slate-500">Cantidad: {it.qty}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">${(it.price * it.qty).toFixed(2)}</div>
                        <div className="mt-2 flex gap-2">
                          <button onClick={() => removeFromCart(it.id, it.type)} className="text-sm px-3 py-1 border rounded">Quitar</button>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="flex items-center justify-between font-bold text-lg">
                    <div>Total</div>
                    <div>${cartTotal().toFixed(2)}</div>
                  </div>

                  <form onSubmit={handleCheckout} className="grid gap-3">
                    <input required placeholder="Nombre completo" value={customer.name} onChange={(e) => setCustomer(s => ({ ...s, name: e.target.value }))} className="p-3 border rounded" />
                    <input required placeholder="Email" type="email" value={customer.email} onChange={(e) => setCustomer(s => ({ ...s, email: e.target.value }))} className="p-3 border rounded" />
                    <input placeholder="Teléfono" value={customer.phone} onChange={(e) => setCustomer(s => ({ ...s, phone: e.target.value }))} className="p-3 border rounded" />
                    <button type="submit" className="px-4 py-3 bg-emerald-600 text-white rounded">Finalizar compra (mock)</button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
