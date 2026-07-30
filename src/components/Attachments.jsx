const attachmentLabels = {
tarjeta:"Tarjeta",
poliza:"Poliza",
licencia:"Licencia",
facturas:"Facturas",
carne:"Carne (opcional)"
};

const requiredAttachmentKeys = [
"tarjeta",
"poliza",
"licencia",
"facturas"
];

export default function Attachments({attachments,setAttachments,enableAttachments,attachmentsResetKey,attachmentError}){

return(

<div className="section">

<div className="section-title">
Archivos Adjuntos
</div>

<p className="attachment-note">
Si no contiene los documentos del vehículo que se solicitan adjuntar, gestionar su ingreso con la Carta de visita sin vehículo.
</p>

{attachmentError && (
<p className="attachment-error" role="alert">
{attachmentError}
</p>
)}

<div className="attachments-grid">

{Object.keys(attachments).map((key)=>{
const selectedFile = attachments[key];
const isRequired = requiredAttachmentKeys.includes(key);

return(

<div key={key} className="attachment-card">

<label className="attachment-name">
{attachmentLabels[key] || key}
</label>

<input
key={`${key}-${attachmentsResetKey}`}
type="file"
accept="image/*,.pdf,application/pdf"
disabled={!enableAttachments}
required={enableAttachments && isRequired}
onChange={(e)=>{
const file = e.target.files?.[0] || false;

setAttachments({
...attachments,
[key]:file
})
}}
/>

{selectedFile && (
<div className="attachment-status">
Archivo cargado: {selectedFile.name}
</div>
)}

</div>

);
})}

</div>

</div>

)

}
