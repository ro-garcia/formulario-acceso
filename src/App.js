import { useState } from "react";

import Header from "./components/Header";
import FormTypeSelector from "./components/FormTypeSelector";
import GeneralInfo from "./components/GeneralInfo";
import PeopleTable from "./components/PeopleTable";
import ToolsTable from "./components/ToolsTable";
import MaterialsTable from "./components/Materials";
import VehicleForm from "./components/VehicleForm";
import Attachments from "./components/Attachments";

import { FORM_TYPES } from "./constants";
import { formConfig } from "./formConfig";

export default function App() {

const [formType,setFormType] = useState("");

const [general,setGeneral] = useState({
empresa:"",
motivo:"",
fecha:"",
facturas:""
});

const [personCount,setPersonCount] = useState(0);
const [people,setPeople] = useState([]);

const [toolCount,setToolCount] = useState(0);
const [tools,setTools] = useState([]);

/* ✅ NUEVO: MATERIALES */
const [materialCount,setMaterialCount] = useState(0);
const [materials,setMaterials] = useState([]);

/* ✅ VEHICULOS COMO ARRAY */
const [vehicle,setVehicle] = useState([
{
placa:"",
modelo:"",
color:"",
marca:"",
poliza:"",
file:null
}
]);

const [attachments,setAttachments] = useState({
tarjeta:false,
poliza:false,
licencia:false,
facturas:false,
carne:false
});

const [lastSubmit,setLastSubmit] = useState(null);
const [sending,setSending] = useState(false);


/* -------------------- RESET FORM -------------------- */

const resetForm = () => {

setGeneral({
empresa:"",
motivo:"",
fecha:"",
facturas:""
});

setPersonCount(0);
setPeople([]);

setToolCount(0);
setTools([]);

/* ✅ RESET MATERIALES */
setMaterialCount(0);
setMaterials([]);

/* ✅ RESET VEHICULOS */
setVehicle([
{
placa:"",
modelo:"",
color:"",
marca:"",
poliza:"",
file:null
}
]);

setAttachments({
tarjeta:false,
poliza:false,
licencia:false,
facturas:false,
carne:false
});

};


/* -------------------- LOGICA -------------------- */

const enableVehicle =
formType === FORM_TYPES[1] ||
formType === FORM_TYPES[2] ||
formType === FORM_TYPES[3] ||
formType === FORM_TYPES[4] ||
formType === FORM_TYPES[5];

const enableTools =
formType === FORM_TYPES[2] ||
formType === FORM_TYPES[3] ||
formType === FORM_TYPES[5];

/* ✅ MATERIALES USA MISMA LOGICA QUE TOOLS */
const enableMaterials = enableTools;

const enableInvoices =
formType === FORM_TYPES[3] ||
formType === FORM_TYPES[5] ||
formType === FORM_TYPES[4];

const enableAttachments =
formType === FORM_TYPES[1] ||
formType === FORM_TYPES[2] ||
formType === FORM_TYPES[3];


/* -------------------- PERSONAS -------------------- */

const changePersonCount = (value) => {

const n = parseInt(value);
setPersonCount(n);

let newPeople = [...people];

if (newPeople.length > n) {
newPeople = newPeople.slice(0,n);
} else {
while(newPeople.length < n){
newPeople.push({
nombre:"",
dpi:"",
ocupacion:"",
carne:""
});
}
}

setPeople(newPeople);
};

const updatePerson = (index,field,value) => {
const newPeople = [...people];
newPeople[index][field] = value;
setPeople(newPeople);
};


/* -------------------- HERRAMIENTAS -------------------- */

const changeToolCount = (value) => {

const n = parseInt(value);
setToolCount(n);

let newTools = [...tools];

if(newTools.length > n){
newTools = newTools.slice(0,n);
}else{
while(newTools.length < n){
newTools.push({
descripcion:"",
cantidad:"",
factura:""
});
}
}

setTools(newTools);
};

const updateTool = (index,field,value) => {
const newTools = [...tools];
newTools[index][field] = value;
setTools(newTools);
};


/* -------------------- MATERIALES -------------------- */

const changeMaterialCount = (value) => {

const n = parseInt(value);
setMaterialCount(n);

let newMaterials = [...materials];

if(newMaterials.length > n){
newMaterials = newMaterials.slice(0,n);
}else{
while(newMaterials.length < n){
newMaterials.push({
descripcion:"",
cantidad:"",
factura:""
});
}
}

setMaterials(newMaterials);
};

const updateMaterial = (index,field,value) => {
const newMaterials = [...materials];
newMaterials[index][field] = value;
setMaterials(newMaterials);
};


/* -------------------- ENVIAR FORMULARIO -------------------- */

const submitForm = async () => {

if(sending) return;

const now = Date.now();

if(lastSubmit && now - lastSubmit < 60000){
alert("Solo puedes enviar un formulario por minuto.");
return;
}

setSending(true);

const payload = {

tipoFormulario: formType,

empresaSolicita: general.empresa,
motivoIngreso: general.motivo,
fechaSolicitudIngreso: general.fecha,
numeroFacturas: general.facturas,

vehiculos: vehicle.map(v => ({
placa: v.placa,
color: v.color,
marca: v.marca,
modelo: v.modelo,
numeroPoliza: v.poliza
})),

personas: people.map(p => ({
nombre: p.nombre,
documentoID: p.dpi,
ocupacion: p.ocupacion,
numeroCarne: p.carne
})),

herramientas: tools.map((t,i)=>({
numeroItem: String(i+1),
descripcion: t.descripcion,
cantidad: t.cantidad,
numeroFactura: t.factura
})),

/* ✅ NUEVO */
materiales: materials.map((m,i)=>({
numeroItem: String(i+1),
descripcion: m.descripcion,
cantidad: m.cantidad,
numeroFactura: m.factura
})),

adjuntos: Object.keys(attachments)
.filter(key => attachments[key])
.map(key => ({
nombre:key,
contenido:""
}))

};

console.log("Payload enviado:",payload);

try{

const API_URL = process.env.REACT_APP_POWER_AUTOMATE_URL;

const response = await fetch(API_URL,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(payload)
});

if(response.status === 200 || response.status === 202){

alert("Formulario enviado correctamente");

setLastSubmit(now);

resetForm();

}else{

throw new Error("Respuesta inesperada");

}

}catch(error){

console.error("Error enviando formulario:",error);

alert("No se pudo confirmar el envío, pero el formulario pudo haberse recibido.");

}

setSending(false);

};


/* -------------------- COMPONENTES -------------------- */

const componentMap = {

general: (
<GeneralInfo
general={general}
setGeneral={setGeneral}
enableInvoices={enableInvoices}
/>
),

attachments: (
<Attachments
attachments={attachments}
setAttachments={setAttachments}
enableAttachments={enableAttachments}
/>
),

people: (
<PeopleTable
people={people}
personCount={personCount}
changePersonCount={changePersonCount}
updatePerson={updatePerson}
/>
),

vehicle: (
<VehicleForm
vehicle={vehicle}
setVehicle={setVehicle}
enableVehicle={enableVehicle}
/>
),

tools: (
<ToolsTable
tools={tools}
toolCount={toolCount}
changeToolCount={changeToolCount}
updateTool={updateTool}
enableTools={enableTools}
/>
),

/* ✅ NUEVO */
materials: (
<MaterialsTable
materials={materials}
materialCount={materialCount}
changeMaterialCount={changeMaterialCount}
updateMaterial={updateMaterial}
enableMaterials={enableMaterials}
/>
)

};


/* -------------------- RENDER -------------------- */

return (

<div className="container">

<Header/>

<FormTypeSelector
formType={formType}
setFormType={(value)=>{
resetForm();
setFormType(value);
}}
/>

{formConfig[formType]?.map((component)=>(
<div key={component}>
{componentMap[component]}
</div>
))}

<div style={{marginTop:"40px",textAlign:"center"}}>

<button
onClick={submitForm}
disabled={sending}
style={{
padding:"14px 30px",
fontSize:"16px",
background:sending ? "#6b7280" : "#0f172a",
color:"white",
border:"none",
borderRadius:"8px",
cursor:"pointer"
}}
>
{sending ? "Enviando..." : "Enviar Formulario"}
</button>

</div>

</div>

);

}