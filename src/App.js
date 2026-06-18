import { useState } from "react";

import Header from "./components/Header";
import FormTypeSelector from "./components/FormTypeSelector";
import GeneralInfo from "./components/GeneralInfo";
import PeopleTable from "./components/PeopleTable";
import ToolsTable from "./components/ToolsTable";
import MaterialsTable from "./components/Materials";
import VehicleForm from "./components/VehicleForm";
import Attachments from "./components/Attachments";
import InductionForm from "./components/InductionForm";

import { FORM_TYPES } from "./constants";
import { formConfig } from "./formConfig";

const createPerson = () => ({
nombre:"",
dpi:"",
ocupacion:"",
carne:""
});

const createVehicle = () => ({
placa:"",
modelo:"",
color:"",
marca:"",
poliza:""
});

const createTool = () => ({
descripcion:"",
cantidad:"1",
factura:""
});

const createMaterial = () => ({
descripcion:"",
cantidad:"1",
factura:""
});

const hasSection = (type, section) =>
(formConfig[type] || []).includes(section);

const isBlank = (value) => !String(value || "").trim();

const getTodayDate = () => {
const now = new Date();
now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
return now.toISOString().slice(0,10);
};

const fileToBase64 = (file) => new Promise((resolve,reject) => {
const reader = new FileReader();

reader.onload = () => {
const result = String(reader.result || "");
resolve(result.includes(",") ? result.split(",")[1] : result);
};

reader.onerror = () => reject(reader.error);
reader.readAsDataURL(file);
});

const isInvalidQuantity = (value) => {
const quantity = Number(value || 1);
return !Number.isFinite(quantity) || quantity < 1;
};

export default function App() {

const [currentView,setCurrentView] = useState("induction");
const [accessUnlocked,setAccessUnlocked] = useState(false);

const [formType,setFormType] = useState("");

const [general,setGeneral] = useState({
empresa:"",
telefono:"",
correo:"",
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
const [vehicle,setVehicle] = useState([]);

const [attachments,setAttachments] = useState({
tarjeta:false,
poliza:false,
licencia:false,
facturas:false,
carne:false
});
const [attachmentsResetKey,setAttachmentsResetKey] = useState(0);

const [lastSubmit,setLastSubmit] = useState(null);
const [sending,setSending] = useState(false);


/* -------------------- RESET FORM -------------------- */

const resetForm = (nextFormType = formType) => {

setGeneral({
empresa:"",
telefono:"",
correo:"",
motivo:"",
fecha:"",
facturas:""
});

setPersonCount(nextFormType ? 1 : 0);
setPeople(nextFormType ? [createPerson()] : []);

setToolCount(hasSection(nextFormType,"tools") ? 1 : 0);
setTools(hasSection(nextFormType,"tools") ? [createTool()] : []);

/* ✅ RESET MATERIALES */
setMaterialCount(hasSection(nextFormType,"materials") ? 1 : 0);
setMaterials(hasSection(nextFormType,"materials") ? [createMaterial()] : []);

/* ✅ RESET VEHICULOS */
setVehicle(hasSection(nextFormType,"vehicle") ? [createVehicle()] : []);

setAttachments({
tarjeta:false,
poliza:false,
licencia:false,
facturas:false,
carne:false
});
setAttachmentsResetKey((key) => key + 1);

};


/* -------------------- LOGICA -------------------- */

const enableVehicle = hasSection(formType,"vehicle");

const enableTools = hasSection(formType,"tools");

/* ✅ MATERIALES USA MISMA LOGICA QUE TOOLS */
const enableMaterials = hasSection(formType,"materials");

const enableInvoices =
formType === FORM_TYPES[3] ||
formType === FORM_TYPES[5] ||
formType === FORM_TYPES[4];

const enableAttachments =
Boolean(formType) && formType !== FORM_TYPES[0];


/* -------------------- PERSONAS -------------------- */

const changePersonCount = (value) => {

const n = Math.max(1, parseInt(value) || 1);
setPersonCount(n);

let newPeople = [...people];

if (newPeople.length > n) {
newPeople = newPeople.slice(0,n);
} else {
while(newPeople.length < n){
newPeople.push(createPerson());
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

const n = Math.max(1, parseInt(value) || 1);
setToolCount(n);

let newTools = [...tools];

if(newTools.length > n){
newTools = newTools.slice(0,n);
}else{
while(newTools.length < n){
newTools.push(createTool());
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

const n = Math.max(1, parseInt(value) || 1);
setMaterialCount(n);

let newMaterials = [...materials];

if(newMaterials.length > n){
newMaterials = newMaterials.slice(0,n);
}else{
while(newMaterials.length < n){
newMaterials.push(createMaterial());
}
}

setMaterials(newMaterials);
};

const updateMaterial = (index,field,value) => {
const newMaterials = [...materials];
newMaterials[index][field] = value;
setMaterials(newMaterials);
};

const validateForm = () => {

if(!formType){
alert("Selecciona el tipo de acceso que deseas solicitar.");
return false;
}

if(isBlank(general.empresa)){
alert("Empresa que solicita es obligatorio.");
return false;
}

if(isBlank(general.telefono)){
alert("Numero de telefono es obligatorio.");
return false;
}

if(isBlank(general.correo)){
alert("Correo electronico es obligatorio.");
return false;
}

if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(general.correo)){
alert("Correo electronico no tiene un formato valido.");
return false;
}

if(isBlank(general.motivo)){
alert("Motivo de ingreso es obligatorio.");
return false;
}

if(isBlank(general.fecha)){
alert("Fecha es obligatorio.");
return false;
}

if(general.fecha < getTodayDate()){
alert("La fecha no puede ser anterior al dia de hoy.");
return false;
}

if(enableInvoices && isBlank(general.facturas)){
alert("Facturas es obligatorio para este tipo de formulario.");
return false;
}

if(personCount < 1 || people.length < 1){
alert("Debes agregar al menos una persona.");
return false;
}

const invalidPersonIndex = people.findIndex((person) =>
isBlank(person.nombre) ||
isBlank(person.dpi) ||
isBlank(person.ocupacion)
);

if(invalidPersonIndex >= 0){
alert(`Completa Nombre, DPI / Licencia y Ocupacion de la persona ${invalidPersonIndex + 1}.`);
return false;
}

if(enableVehicle && vehicle.length < 1){
alert("Debes agregar al menos un vehiculo.");
return false;
}

const invalidVehicleIndex = vehicle.findIndex((item) =>
isBlank(item.placa) ||
isBlank(item.modelo) ||
isBlank(item.color) ||
isBlank(item.marca) ||
isBlank(item.poliza)
);

if(enableVehicle && invalidVehicleIndex >= 0){
alert(`Completa todos los datos del vehiculo ${invalidVehicleIndex + 1}.`);
return false;
}

if(enableTools && (toolCount < 1 || tools.length < 1)){
alert("Debes agregar al menos una herramienta.");
return false;
}

const invalidToolIndex = tools.findIndex((tool) =>
isBlank(tool.descripcion) ||
isInvalidQuantity(tool.cantidad) ||
isBlank(tool.factura)
);

if(enableTools && invalidToolIndex >= 0){
alert(`Completa Descripcion, Cantidad y No. Factura de la herramienta ${invalidToolIndex + 1}.`);
return false;
}

if(enableTools && tools.some((tool) => isInvalidQuantity(tool.cantidad))){
alert("La cantidad minima de cada herramienta debe ser 1.");
return false;
}

if(enableMaterials && (materialCount < 1 || materials.length < 1)){
alert("Debes agregar al menos un material.");
return false;
}

const invalidMaterialIndex = materials.findIndex((material) =>
isBlank(material.descripcion) ||
isInvalidQuantity(material.cantidad) ||
isBlank(material.factura)
);

if(enableMaterials && invalidMaterialIndex >= 0){
alert(`Completa Descripcion, Cantidad y No. Factura del material ${invalidMaterialIndex + 1}.`);
return false;
}

if(enableMaterials && materials.some((material) => isInvalidQuantity(material.cantidad))){
alert("La cantidad minima de cada material debe ser 1.");
return false;
}

return true;

};


/* -------------------- ENVIAR FORMULARIO -------------------- */

const submitForm = async () => {

if(sending) return;

if(!validateForm()) return;

const now = Date.now();

if(lastSubmit && now - lastSubmit < 60000){
alert("Solo puedes enviar un formulario por minuto.");
return;
}

setSending(true);

try{

const adjuntos = await Promise.all(
Object.entries(attachments)
.filter(([,file]) => file)
.map(async ([key,file]) => ({
nombre: `${key}-${file.name}`,
contenido: await fileToBase64(file)
}))
);

const payload = {
  tipoFormulario: formType,

  empresaSolicita: general.empresa,
  numeroTelefono: general.telefono,
  correoElectronico: general.correo,
  motivoIngreso: general.motivo,
  fechaSolicitudIngreso: general.fecha,
  numeroFacturas: general.facturas,

  personas: people.map(p => ({
    nombre: p.nombre,
    documentoID: p.dpi,
    ocupacion: p.ocupacion,
    numeroCarne: p.carne
  })),

  vehiculos: vehicle.map(v => ({
    placa: v.placa,
    modelo: v.modelo,
    color: v.color,
    marca: v.marca,
    poliza: v.poliza
  })),

  herramientas: tools.map((t, i) => ({
    numeroItem: String(i + 1),
    descripcion: t.descripcion,
    cantidad: t.cantidad || "1",
    numeroFactura: t.factura
  })),

  materiales: materials.map((m, i) => ({
    numeroItem: String(i + 1),
    descripcion: m.descripcion,
    cantidad: m.cantidad || "1",
    numeroFactura: m.factura
  })),

  adjuntos
};

console.log("Payload enviado:",payload);

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

resetForm(formType);

}else{

throw new Error("Respuesta inesperada");

}

}catch(error){

console.error("Error enviando formulario:",error);

alert("No se pudo confirmar el envío, pero el formulario pudo haberse recibido.");

}

setSending(false);

};

const openInductionForm = () => {
setCurrentView("induction");
if(typeof window !== "undefined"){
window.history.pushState(null,"","#induccion-sso");
window.scrollTo({ top:0, behavior:"smooth" });
}
};

const openAccessForm = () => {
setAccessUnlocked(true);
setCurrentView("access");
if(typeof window !== "undefined"){
window.history.pushState(null,"","#formularios-acceso");
window.scrollTo({ top:0, behavior:"smooth" });
}
};

if(currentView === "induction" || !accessUnlocked){
return(
<div className="container">
<InductionForm onComplete={openAccessForm}/>
</div>
);
}


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
attachmentsResetKey={attachmentsResetKey}
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

<Header onOpenInduction={openInductionForm}/>

<FormTypeSelector
formType={formType}
setFormType={(value)=>{
resetForm(value);
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
