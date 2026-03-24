export default function GeneralInfo({general,setGeneral,enableInvoices}){

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
value={general.empresa}
onChange={(e)=>setGeneral({...general,empresa:e.target.value})}
/>
</div>

<div className="form-field">
<label>Motivo de ingreso</label>
<input
type="text"
value={general.motivo}
onChange={(e)=>setGeneral({...general,motivo:e.target.value})}
/>
</div>

<div className="form-field">
<label>Fecha</label>
<input
type="date"
value={general.fecha}
onChange={(e)=>setGeneral({...general,fecha:e.target.value})}
/>
</div>



<div className="form-field">
<label>Facturas (separadas por comas)</label>
<input
type="text"
disabled={!enableInvoices}
value={general.facturas}
onChange={(e)=>setGeneral({...general,facturas:e.target.value})}
/>
</div>

</div>

</div>

)

}