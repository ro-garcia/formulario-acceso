export default function Attachments({attachments,setAttachments,enableAttachments}){

return(

<div className="section">

<div className="section-title">
Archivos Adjuntos
</div>

<div className="attachments-grid">

{Object.keys(attachments).map((key)=>(

<div key={key} className="attachment-card">

<label className="attachment-name">
{key}
</label>

<input
type="file"
disabled={!enableAttachments}
onChange={(e)=>{

if(e.target.files.length>0){

setAttachments({
...attachments,
[key]:true
})

}

}}
/>

{attachments[key] && (
<div className="attachment-status">
✔ Archivo cargado
</div>
)}

</div>

))}

</div>

</div>

)

}