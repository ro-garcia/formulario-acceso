"use client";

const quantityOptions = Array.from({ length: 100 }, (_, i) => i + 1);

export default function ToolsTable({
  tools,
  toolCount,
  changeToolCount,
  updateTool,
  enableTools
}) {

  return (

    <div className="section">

      <div className="section-title">
        Ingreso de Herramientas
      </div>

      {/* SELECT CANTIDAD */}
      <select
        className="tool-count"
        disabled={!enableTools}
        value={toolCount}
        onChange={(e) => changeToolCount(e.target.value)}
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

            {tools.map((t, i) => (

              <tr key={i}>

                {/* NUMERO */}
                <td className="col-num">{i + 1}</td>

                {/* DESCRIPCION */}
                <td className="col-desc">
                  <input
                    disabled={!enableTools}
                    value={t.descripcion}
                    onChange={(e) =>
                      updateTool(i, "descripcion", e.target.value)
                    }
                    placeholder="Descripción"
                  />
                </td>

                {/* CANTIDAD */}
                <td className="col-qty">
                  <select
                    className="quantity-select"
                    disabled={!enableTools}
                    value={t.cantidad || "1"}
                    onChange={(e) =>
                      updateTool(i, "cantidad", e.target.value)
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
                    disabled={!enableTools}
                    value={t.factura || ""}
                    onChange={(e) =>
                      updateTool(i, "factura", e.target.value)
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
