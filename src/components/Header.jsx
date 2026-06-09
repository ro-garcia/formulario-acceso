export default function Header({ onOpenInduction }){

return(

<div className="form-header">

<img
className="header-logo"
src="https://repimex.gt/PortalRepimex/Images/LogoRepimex.png"
alt="Repimex"
/>

<h1>
FORMULARIO DE ACCESO PARA INGRESO AL RECINTO PORTUARIO
</h1>

<div className="entry-terms">
<h2>Términos para el Ingreso</h2>

<p>El ingreso es por nuestra puerta fiscal Repimex y su egreso será por la misma.</p>
<p>El uso del Equipo de Protección Personal EPP, es obligatorio (Casco de seguridad, camisa o chaleco reflectivo, calzado cerrado de preferencia Industrial).</p>
<p>Prohibido ingresar bajo efectos de alcohol (desde su ingreso se realizará prueba de alcoholemia).</p>
<p>Prohibido fumar e ingresar armas de fuego y/o armas blancas (serán retenidas desde su ingreso).</p>
<p>Prohibido ingresar a zonas restringidas (sin autorización).</p>
<p>Prohibido tomar videos y fotografías para difundirlas por las redes sociales u otros medios (las fotos deberán ser única y exclusivamente para fines de trabajo o fines de estudio).</p>
<p>Si se conduce en vehículo de 2 o 4 ruedas, respetar los límites de velocidad establecidos (15 km/h).</p>
<p>Atender en todo momento las instrucciones que el personal de protección les indique.</p>
<p>
TODO personal que ingrese deberá ver y{" "}
<a
href="#induccion-sso"
className="terms-link"
onClick={(e)=>{
e.preventDefault();
onOpenInduction?.();
}}
>
completar el formulario de la capacitación
</a>{" "}
de Inducción de Seguridad y Seguridad Ocupacional.
</p>
<p>Llenar este formulario de forma correcta, adjuntar los archivos requeridos y la información del personal requerida.</p>
</div>

</div>

)

}
