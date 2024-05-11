using System;
using System.Collections.Generic;

namespace thebusinessproject.Entities;

/// <summary>
/// Representa un conductor en la base de datos. Tiene relación con la tabla consulta de la db.
/// </summary>
public partial class ResultadoConsultum
{
    /// <summary>
    /// Es el id de cada resultado de consulta, es autoincremental
    /// </summary>
    public int IdresultadoConsulta { get; set; }
    /// <summary>
    /// Es el string que contiene el texto que se generó en la IA.
    /// </summary>
    public string? Resultado { get; set; }
    /// <summary>
    /// Es el id de la consulta a la que pertenece este resultado.
    /// </summary>
    public int Idconsulta { get; set; }
    /// <summary>
    /// Es una referencia a la tabla de la db Consulta, obviamente esto porque un resultado es de una consulta.
    /// </summary>
    public virtual Consultum IdconsultaNavigation { get; set; } = null!;
}
