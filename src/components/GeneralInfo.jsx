const getTodayDate = () => {
const now = new Date();
now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
return now.toISOString().slice(0,10);
};

export default function GeneralInfo({general,setGeneral,enableInvoices}){

const today = getTodayDate();

return(

<div className="section">

<div className="section-title">
Información General
</div>

<div className="grid">

<div className="form-field">
<label>Empresa que solicita</label>
<input
type="text"
required
value={general.empresa}
onChange={(e)=>setGeneral({...general,empresa:e.target.value})}
/>
</div>

<div className="form-field">
<label>Número de teléfono</label>
<input
type="tel"
required
value={general.telefono}
onChange={(e)=>setGeneral({...general,telefono:e.target.value})}
/>
</div>

<div className="form-field">
<label>Correo electrónico</label>
<input
type="email"
required
value={general.correo}
onChange={(e)=>setGeneral({...general,correo:e.target.value})}
/>
</div>

<div className="form-field">
<label>Motivo de ingreso</label>
<input
type="text"
required
value={general.motivo}
onChange={(e)=>setGeneral({...general,motivo:e.target.value})}
/>
</div>

<div className="form-field">
<label>Fecha</label>
<input
type="date"
required
min={today}
value={general.fecha}
onChange={(e)=>setGeneral({...general,fecha:e.target.value})}
/>
</div>

{enableInvoices && (
<div className="form-field">
<label>Facturas (separadas por comas)</label>
<input
type="text"
required
value={general.facturas}
onChange={(e)=>setGeneral({...general,facturas:e.target.value})}
/>
</div>
)}

</div>

</div>

)

}
