import { useEffect, useRef, useState } from "react";

const maxPeople = 10;

const createInductionPerson = () => ({
nombre:"",
dpi:"",
dpiFile:null
});

const isBlank = (value) => !String(value || "").trim();

export default function InductionForm({ onComplete }){

const [personCount,setPersonCount] = useState(1);
const [people,setPeople] = useState([createInductionPerson()]);
const [videoCompleted,setVideoCompleted] = useState(false);
const [videoReady,setVideoReady] = useState(false);
const [evidence,setEvidence] = useState(null);

const iframeRef = useRef(null);
const playerRef = useRef(null);
const maxWatchedSecondsRef = useRef(0);
const videoCompletedRef = useRef(false);

useEffect(() => {
let cancelled = false;

const setupPlayer = () => {
if(cancelled || !iframeRef.current || !window.Vimeo?.Player) return;

const player = new window.Vimeo.Player(iframeRef.current);
playerRef.current = player;

player.ready().then(() => {
if(!cancelled) setVideoReady(true);
});

player.on("timeupdate", ({ seconds }) => {
if(videoCompletedRef.current) return;

if(seconds <= maxWatchedSecondsRef.current + 2){
maxWatchedSecondsRef.current = Math.max(maxWatchedSecondsRef.current, seconds);
return;
}

player.setCurrentTime(maxWatchedSecondsRef.current);
});

player.on("seeked", ({ seconds }) => {
if(videoCompletedRef.current) return;

if(seconds > maxWatchedSecondsRef.current + 0.75){
player.setCurrentTime(maxWatchedSecondsRef.current);
}
});

player.on("ended", () => {
maxWatchedSecondsRef.current = Number.POSITIVE_INFINITY;
videoCompletedRef.current = true;
setVideoCompleted(true);
});
};

if(window.Vimeo?.Player){
setupPlayer();
}else{
const existingScript = document.querySelector("script[data-vimeo-player]");

if(existingScript){
existingScript.addEventListener("load", setupPlayer, { once:true });
}else{
const script = document.createElement("script");
script.src = "https://player.vimeo.com/api/player.js";
script.dataset.vimeoPlayer = "true";
script.onload = setupPlayer;
document.body.appendChild(script);
}
}

return () => {
cancelled = true;
};
}, []);

const changePersonCount = (value) => {
const n = Math.max(1, Math.min(parseInt(value) || 1, maxPeople));

let newPeople = [...people];

if(newPeople.length > n){
newPeople = newPeople.slice(0,n);
}else{
while(newPeople.length < n){
newPeople.push(createInductionPerson());
}
}

setPersonCount(n);
setPeople(newPeople);
};

const updatePerson = (index,field,value) => {
const newPeople = [...people];
newPeople[index][field] = value;
setPeople(newPeople);
};

const submitInductionForm = (e) => {
e.preventDefault();

if(!videoCompleted){
alert("Debes ver el video completo antes de enviar el formulario.");
return;
}

const invalidIndex = people.findIndex((person) =>
isBlank(person.nombre) ||
isBlank(person.dpi) ||
!person.dpiFile
);

if(invalidIndex >= 0){
alert(`Completa Nombre completo, DPI / Licencia / Pasaporte y adjunto del documento de la persona ${invalidIndex + 1}.`);
return;
}

if(!evidence){
alert("Debes adjuntar la evidencia fotografica de la visualizacion del video de induccion.");
return;
}

console.log("Formulario de induccion:",{
personas: people.map((person) => ({
nombre: person.nombre,
dpi: person.dpi,
adjuntoDpi: person.dpiFile?.name || ""
})),
evidenciaFotografica: evidence.name
});

alert("Formulario de induccion registrado correctamente. Ya puedes continuar con el formulario de acceso al recito portuario.");
onComplete?.();
};

return(

<>
<div className="form-header">
<img
className="header-logo"
src="https://repimex.gt/PortalRepimex/Images/LogoRepimex.png"
alt="Repimex"
/>

<h1>
Formulario de recibimiento de Inducción de Salud y Seguridad Ocupacional
</h1>

<div className="entry-terms induction-copy">
<p>
Por este medio se informa que toda persona que desee ingresar a las instalaciones deberá ver previamente el video de Inducción de Salud y Seguridad Ocupacional, ya que su contenido es obligatorio para conocer las normas, medidas preventivas y lineamientos de seguridad establecidos dentro de la terminal de Repimex.
</p>

<p>
Al completar este formulario, la(s) persona(s) confirma(n) que ha(n) visto el video de inducción, comprende las normas de Salud y Seguridad Ocupacional y se compromete a cumplirlas durante su permanencia dentro de las instalaciones.
</p>
</div>
</div>

<div className="section">
<div className="video-wrapper">
<iframe
ref={iframeRef}
src="https://player.vimeo.com/video/1195834831?badge=0&autopause=0&player_id=0&app_id=58479"
frameBorder="0"
allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
referrerPolicy="strict-origin-when-cross-origin"
title="Video de Inducción para Ingreso a la Terminal - RX 1"
allowFullScreen
/>
</div>
<div className={videoCompleted ? "video-status video-status-complete" : "video-status"}>
{videoCompleted
? "Induccion para ingreso a la terminal completada. Ya puedes llenar este formulario; al enviarlo se habilitaran los formularios de acceso al recinto portuario Repimex."
: videoReady
? "Debes ver el video completo sin saltarlo, de principio a fin, para habilitar el envío de este formulario."
: "Cargando reproductor de video, espere..."}
</div>
</div>

<form onSubmit={submitInductionForm}>
<fieldset className="induction-fieldset" disabled={!videoCompleted}>
<div className="section">
<div className="section-title">
Datos del personal que confirma ver el video de inducción. seleccione cantidad:
</div>

<select
className="person-count"
value={personCount}
onChange={(e)=>changePersonCount(e.target.value)}
>
{[...Array(maxPeople)].map((_, i) => (
<option key={i + 1} value={i + 1}>
{i + 1}
</option>
))}
</select>

<div className="table-scroll">
<table className="people-table induction-table">
<thead>
<tr>
<th>No</th>
<th>Nombre completo</th>
<th>DPI / Licencia / Pasaporte</th>
<th>Adjunto DPI</th>
</tr>
</thead>

<tbody>
{people.map((person,i)=>(
<tr key={i}>
<td>{i + 1}</td>

<td>
<input
required
value={person.nombre}
onChange={(e)=>updatePerson(i,"nombre",e.target.value)}
/>
</td>

<td>
<input
required
value={person.dpi}
onChange={(e)=>updatePerson(i,"dpi",e.target.value)}
/>
</td>

<td>
<input
type="file"
accept="image/*,.pdf"
required
onChange={(e)=>updatePerson(i,"dpiFile",e.target.files[0] || null)}
/>
{person.dpiFile && (
<div className="attachment-status">
{person.dpiFile.name}
</div>
)}
</td>
</tr>
))}
</tbody>
</table>
</div>
</div>

<div className="section">
<div className="section-title">
Evidencia Fotográfica de la visualización del video.
</div>

<div className="form-field">
<label>Adjuntar evidencia fotográfica</label>
<input
type="file"
accept="image/*"
required
onChange={(e)=>setEvidence(e.target.files[0] || null)}
/>
</div>

{evidence && (
<div className="attachment-status">
Archivo seleccionado: {evidence.name}
</div>
)}
</div>
</fieldset>

<div className="submit-actions">
<button type="submit" className="primary-button" disabled={!videoCompleted}>
Enviar Formulario de Inducción y Continuar
</button>
</div>
</form>
</>

);

}
