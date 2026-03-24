export default function VehicleForm({ vehicle, setVehicle, enableVehicle }) {

  const maxVehicles = 5;

  // cantidad (igual que personas)
  const count = vehicle.length || 1;

  const changeVehicleCount = (value) => {
    const n = Math.min(parseInt(value) || 0, maxVehicles);

    let newVehicles = [...vehicle];

    if (newVehicles.length > n) {
      newVehicles = newVehicles.slice(0, n);
    } else {
      while (newVehicles.length < n) {
        newVehicles.push({
          placa: "",
          modelo: "",
          color: "",
          marca: "",
          poliza: "",
          file: null
        });
      }
    }

    setVehicle(newVehicles);
  };

  const updateVehicle = (index, field, value) => {
    const updated = [...vehicle];
    updated[index][field] = value;
    setVehicle(updated);
  };

  return (
    <div className="section">

      <div className="section-title">
        Datos del Vehículo
      </div>

      {/* 🔢 selector cantidad */}
      <div className="form-field" style={{ marginBottom: "15px" }}>
        <label>Cantidad de vehículos (máx 5)</label>
        <input
          type="number"
          min="1"
          max="5"
          disabled={!enableVehicle}
          value={count}
          onChange={(e) => changeVehicleCount(e.target.value)}
        />
      </div>

      {/* 📋 tabla */}
      <div style={{ overflowX: "auto" }}>
        <table className="table" style={{ width: "100%", borderCollapse: "collapse" }}>

          <thead>
            <tr style={{ background: "#f1f5f9" }}>
              <th>#</th>
              <th>Placa</th>
              <th>Modelo</th>
              <th>Color</th>
              <th>Marca</th>
              <th>No. Póliza</th>
              <th>Adjunto</th>
            </tr>
          </thead>

          <tbody>
            {vehicle.map((v, index) => (
              <tr key={index} style={{ borderBottom: "1px solid #e5e7eb" }}>

                <td>{index + 1}</td>

                <td>
                  <input
                    type="text"
                    disabled={!enableVehicle}
                    value={v.placa}
                    onChange={(e) => updateVehicle(index, "placa", e.target.value)}
                  />
                </td>

                <td>
                  <input
                    type="text"
                    disabled={!enableVehicle}
                    value={v.modelo}
                    onChange={(e) => updateVehicle(index, "modelo", e.target.value)}
                  />
                </td>

                <td>
                  <input
                    type="text"
                    disabled={!enableVehicle}
                    value={v.color}
                    onChange={(e) => updateVehicle(index, "color", e.target.value)}
                  />
                </td>

                <td>
                  <input
                    type="text"
                    disabled={!enableVehicle}
                    value={v.marca}
                    onChange={(e) => updateVehicle(index, "marca", e.target.value)}
                  />
                </td>

                <td>
                  <input
                    type="text"
                    disabled={!enableVehicle}
                    value={v.poliza}
                    onChange={(e) => updateVehicle(index, "poliza", e.target.value)}
                  />
                </td>

                <td>
                  <input
                    type="file"
                    disabled={!enableVehicle}
                    onChange={(e) => updateVehicle(index, "file", e.target.files[0])}
                  />
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}