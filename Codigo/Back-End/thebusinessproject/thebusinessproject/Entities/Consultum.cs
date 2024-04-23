using System;
using System.Collections.Generic;

namespace thebusinessproject.Entities;

public partial class Consultum
{
    public int Id { get; set; }

    public string Descripcion { get; set; } = null!;

    public decimal Presupuesto { get; set; }

    public string Tipo { get; set; } = null!;

    public DateTime Fecha { get; set; }

    public virtual ICollection<ResultadoConsultum> ResultadoConsulta { get; set; } = new List<ResultadoConsultum>();

    public virtual UsuarioConsultum? UsuarioConsultum { get; set; }
}
