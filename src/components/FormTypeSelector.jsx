import { VISIBLE_FORM_TYPES } from "../constants";

export default function FormTypeSelector({formType,setFormType}){

return(

<div className="section">

<div className="section-title">
Elija el tipo de acceso que desea solicitar
</div>

<select
value={formType}
onChange={(e)=>setFormType(e.target.value)}
>

<option value="">Seleccione</option>

{VISIBLE_FORM_TYPES.map((t)=>(
<option key={t}>{t}</option>
))}

</select>

</div>

)

}
