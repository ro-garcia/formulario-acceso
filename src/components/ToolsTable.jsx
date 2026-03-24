export default function ToolsTable({
  tools,
  toolCount,
  changeToolCount,
  updateTool,
  enableTools
}){

  return(

    <div className="section">

      <div className="section-title">
        Ingreso de Herramientas
      </div>

      <select
        className="tool-count"
        disabled={!enableTools}
        value={toolCount}
        onChange={(e)=>changeToolCount(e.target.value)}
      >

        <option value={0}>Cantidad</option>

        {[...Array(25)].map((_,i)=>(
          <option key={i+1} value={i+1}>
            {i+1}
          </option>
        ))}

      </select>

      <div className="table-scroll">

        <table className="form-table tools-layout">

          <thead>
            <tr>
              <th className="col-num">No</th>
              <th className="col-desc">Descripción</th>
              <th className="col-qty">Cantidad</th>
              <th className="col-factura">No. Factura</th> {/* ✅ NUEVO */}
            </tr>
          </thead>

          <tbody>

            {tools.map((t,i)=>(

              <tr key={i}>

                <td className="col-num">{i+1}</td>

                <td className="col-desc">
                  <input
                    disabled={!enableTools}
                    value={t.descripcion}
                    onChange={(e)=>updateTool(i,"descripcion",e.target.value)}
                  />
                </td>

                <td className="col-qty">
                  <input
                    disabled={!enableTools}
                    value={t.cantidad}
                    onChange={(e)=>updateTool(i,"cantidad",e.target.value)}
                  />
                </td>

                <td className="col-factura">
                  <input
                    disabled={!enableTools}
                    value={t.factura || ""}
                    onChange={(e)=>updateTool(i,"factura",e.target.value)}
                    placeholder="No. factura"
                  />
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  )
}