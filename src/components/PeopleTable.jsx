export default function PeopleTable({
people,
personCount,
changePersonCount,
updatePerson
}){

return(

<div className="section">

<div className="section-title">
Datos del personal que ingresará, seleccione cantidad:
</div>

<select
className="person-count"
value={personCount}
onChange={(e)=>changePersonCount(e.target.value)}
>

<option value={1}>1</option>
<option value={2}>2</option>
<option value={3}>3</option>
<option value={4}>4</option>
<option value={5}>5</option>
<option value={6}>6</option>
<option value={7}>7</option>
<option value={8}>8</option>
<option value={9}>9</option>
<option value={10}>10</option>

</select>


<div className="table-scroll">

<table className="people-table">

<thead>

<tr>
<th>No</th>
<th>Nombre</th>
<th>DPI / Licencia</th>
<th>Ocupación</th>
<th>No. Carne EPQ (Si aplica)</th>
</tr>

</thead>

<tbody>

{people.map((p,i)=>(

<tr key={i}>

<td>{i+1}</td>

<td>
<input
value={p.nombre}
onChange={(e)=>updatePerson(i,"nombre",e.target.value)}
/>
</td>

<td>
<input
value={p.dpi}
onChange={(e)=>updatePerson(i,"dpi",e.target.value)}
/>
</td>

<td>
<input
value={p.ocupacion}
onChange={(e)=>updatePerson(i,"ocupacion",e.target.value)}
/>
</td>

<td>
<input
value={p.carne}
onChange={(e)=>updatePerson(i,"carne",e.target.value)}
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
