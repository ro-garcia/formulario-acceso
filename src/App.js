import { useState } from "react";

import Header from "./components/Header";
import FormTypeSelector from "./components/FormTypeSelector";
import GeneralInfo from "./components/GeneralInfo";
import PeopleTable from "./components/PeopleTable";
import ToolsTable from "./components/ToolsTable";
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

const [vehicle,setVehicle] = useState({
placa:"",
modelo:"",
color:"",
marca:"",
poliza:""
});

const [attachments,setAttachments] = useState({
tarjeta:false,
poliza:false,
licencia:false,
facturas:false,
carne:false
});


/* -------------------- LOGICA -------------------- */

const enableVehicle =
formType === FORM_TYPES[1] ||
formType === FORM_TYPES[2] ||
formType === FORM_TYPES[3] ||
formType === FORM_TYPES[4];

const enableTools =
formType === FORM_TYPES[2] ||
formType === FORM_TYPES[3];

const enableInvoices =
formType === FORM_TYPES[3] ||
formType === FORM_TYPES[5] ||
formType === FORM_TYPES[4];

const enableAttachments =
formType === FORM_TYPES[1] ||
formType === FORM_TYPES[2] ||
formType === FORM_TYPES[3];


/* -------------------- FUNCIONES PERSONAS -------------------- */

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


/* -------------------- FUNCIONES HERRAMIENTAS -------------------- */

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
cantidad:""
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


/* -------------------- ENVIAR FORMULARIO -------------------- */

const submitForm = async () => {

const payload = {

tipoFormulario: formType,

empresaSolicita: general.empresa,
motivoIngreso: general.motivo,
fechaSolicitudIngreso: general.fecha,
numeroFacturas: general.facturas,

placas: vehicle.placa,
colorVehiculo: vehicle.color,
marcaVehiculo: vehicle.marca,
modeloVehiculo: vehicle.modelo,
numeroPoliza: vehicle.poliza,

personas: people.map(p => ({
nombre: p.nombre,
documentoID: p.dpi,
ocupacion: p.ocupacion,
numeroCarne: p.carne
})),

herramientas: tools.map((t,i)=>({
numeroItem: String(i+1),
descripcion: t.descripcion,
cantidad: t.cantidad
})),

adjuntos: Object.keys(attachments)
.filter(key => attachments[key])
.map(key => ({
nombre:key,
contenido:""
}))

};

console.log("Payload enviado:",payload);

try {

const response = console.log("Payload enviado:", payload);

try {

const API_URL = process.env.REACT_APP_POWER_AUTOMATE_URL;

const response = await fetch(API_URL, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(payload)
});

if (!response.ok) {
  throw new Error("Error en la petición HTTP");
}

const text = await response.text();

console.log("Respuesta Power Automate:", text);

alert("Formulario enviado correctamente");

} catch (error) {

console.error("Error enviando formulario:", error);

alert("Error enviando formulario");

};

if(!response.ok){
throw new Error("Error en la petición HTTP");
}

const text = await response.text();

console.log("Respuesta Power Automate:",text);

alert("Formulario enviado correctamente");

}catch(error){

console.error("Error enviando formulario:",error);

alert("Error enviando formulario");

}

};


/* -------------------- MAPA DE COMPONENTES -------------------- */

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
)

};


/* -------------------- RENDER -------------------- */

return (

<div className="container">

<Header/>

<FormTypeSelector
formType={formType}
setFormType={setFormType}
/>

{formConfig[formType]?.map((component)=>(
<div key={component}>
{componentMap[component]}
</div>
))}

<div style={{marginTop:"40px",textAlign:"center"}}>

<button
onClick={submitForm}
style={{
padding:"14px 30px",
fontSize:"16px",
background:"#0f172a",
color:"white",
border:"none",
borderRadius:"8px",
cursor:"pointer"
}}
>
Enviar Formulario
</button>

</div>

</div>

);

}