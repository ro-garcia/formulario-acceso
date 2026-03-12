export default function ToolsTable({
tools,
toolCount,
changeToolCount,
updateTool,
enableTools
}){

return(

<div className="section">

<div className="section-title">
Ingreso de Herramientas
</div>

<select
className="tool-count"
disabled={!enableTools}
value={toolCount}
onChange={(e)=>changeToolCount(e.target.value)}
>

<option value={0}>Cantidad</option>
<option value={1}>1</option>
<option value={2}>2</option>
<option value={3}>3</option>
<option value={4}>4</option>
<option value={5}>5</option>

</select>

<div className="table-scroll">

<table className="form-table tools-layout">

<thead>

<tr>
<th className="col-num">No</th>
<th className="col-desc">Descripción</th>
<th className="col-qty">Cantidad</th>
</tr>

</thead>

<tbody>

{tools.map((t,i)=>(

<tr key={i}>

<td className="col-num">{i+1}</td>

<td className="col-desc">
<input
disabled={!enableTools}
value={t.descripcion}
onChange={(e)=>updateTool(i,"descripcion",e.target.value)}
/>
</td>

<td className="col-qty">
<input
disabled={!enableTools}
value={t.cantidad}
onChange={(e)=>updateTool(i,"cantidad",e.target.value)}
/>
</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

)

}