using System;
using System.Collections.Generic;

namespace thebusinessproject.Entities;

public partial class ResultadoConsultum
{
    public int IdresultadoConsulta { get; set; }

    public string Pasos { get; set; } = null!;

    public string PresupuestoEstimado { get; set; } = null!;

    public string Probabilidad { get; set; } = null!;

    public int Idconsulta { get; set; }

    public virtual Consultum IdconsultaNavigation { get; set; } = null!;
}
