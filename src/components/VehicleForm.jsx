export default function VehicleForm({vehicle,setVehicle,enableVehicle}){

return(

<div className="section">

<div className="section-title">
Datos del Vehículo
</div>

<div className="grid">

<div className="form-field">
<label>Placa</label>
<input
type="text"
disabled={!enableVehicle}
value={vehicle.placa}
onChange={(e)=>setVehicle({...vehicle,placa:e.target.value})}
/>
</div>

<div className="form-field">
<label>Modelo</label>
<input
type="text"
disabled={!enableVehicle}
value={vehicle.modelo}
onChange={(e)=>setVehicle({...vehicle,modelo:e.target.value})}
/>
</div>

<div className="form-field">
<label>Color</label>
<input
type="text"
disabled={!enableVehicle}
value={vehicle.color}
onChange={(e)=>setVehicle({...vehicle,color:e.target.value})}
/>
</div>

<div className="form-field">
<label>Marca</label>
<input
type="text"
disabled={!enableVehicle}
value={vehicle.marca}
onChange={(e)=>setVehicle({...vehicle,marca:e.target.value})}
/>
</div>

<div className="form-field">
<label>No. Póliza</label>
<input
type="text"
disabled={!enableVehicle}
value={vehicle.poliza}
onChange={(e)=>setVehicle({...vehicle,poliza:e.target.value})}
/>
</div>

</div>

</div>

)

}