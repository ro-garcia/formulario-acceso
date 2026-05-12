"use client";

const quantityOptions = Array.from({ length: 100 }, (_, i) => i + 1);

export default function MaterialsTable({
  materials,
  materialCount,
  changeMaterialCount,
  updateMaterial,
  enableMaterials
}) {

  return (

    <div className="section">

      <div className="section-title">
        Ingreso de Materiales
      </div>

      {/* SELECT CANTIDAD */}
      <select
        className="tool-count"
        disabled={!enableMaterials}
        value={materialCount}
        onChange={(e) => changeMaterialCount(e.target.value)}
      >

        {[...Array(25)].map((_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        ))}

      </select>

      {/* TABLA */}
      <div className="table-scroll">

        <table className="form-table tools-layout">

          <thead>
            <tr>
              <th className="col-num">No</th>
              <th className="col-desc">Descripción</th>
              <th className="col-qty">Cantidad</th>
              <th className="col-factura">No. Factura</th>
            </tr>
          </thead>

          <tbody>

            {materials.map((m, i) => (

              <tr key={i}>

                {/* NUMERO */}
                <td className="col-num">{i + 1}</td>

                {/* DESCRIPCION */}
                <td className="col-desc">
                  <input
                    disabled={!enableMaterials}
                    value={m.descripcion}
                    onChange={(e) =>
                      updateMaterial(i, "descripcion", e.target.value)
                    }
                    placeholder="Descripción"
                  />
                </td>

                {/* CANTIDAD */}
                <td className="col-qty">
                  <select
                    className="quantity-select"
                    disabled={!enableMaterials}
                    value={m.cantidad || "1"}
                    onChange={(e) =>
                      updateMaterial(i, "cantidad", e.target.value)
                    }
                  >
                    {quantityOptions.map((qty) => (
                      <option key={qty} value={qty}>
                        {qty}
                      </option>
                    ))}
                  </select>
                </td>

                {/* FACTURA */}
                <td className="col-factura">
                  <input
                    disabled={!enableMaterials}
                    value={m.factura || ""}
                    onChange={(e) =>
                      updateMaterial(i, "factura", e.target.value)
                    }
                    placeholder="No. factura"
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
