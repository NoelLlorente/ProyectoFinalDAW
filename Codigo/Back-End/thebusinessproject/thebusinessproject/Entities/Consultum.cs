using System;
using System.Collections.Generic;

namespace thebusinessproject.Entities;

/// <summary>
/// Representa un conductor en la base de datos.
/// </summary>
public partial class Consultum
{
    /// <summary>
    /// Es el id autoincremental de la consulta
    /// </summary>
    public int Id { get; set; }
    /// <summary>
    /// Es la descripción de la consulta
    /// </summary>
    public string Descripcion { get; set; } = null!;
    /// <summary>
    /// Es un decimal que indica el presupuesto de la consulta.
    /// </summary>
    public decimal Presupuesto { get; set; }
    /// <summary>
    /// Es el tipo de consulta (online, físico).
    /// </summary>
    public string Tipo { get; set; } = null!;
    /// <summary>
    /// Es la fecha de creación de la consulta.
    /// </summary>
    public DateTime Fecha { get; set; }

    /// <summary>
    /// Es una referencia hacia la tabla resultado_consulta de la db, básicamente en esa tabla tendremos los resultados de cada consulta.
    /// </summary>
    public virtual ResultadoConsultum? ResultadoConsultum { get; set; }
    /// <summary>
    /// Es una referencia a la tabla usuario_consulta de la base de datos, esto es porque un usuario puede tener una o varias consultas.
    /// </summary>
    public virtual UsuarioConsultum? UsuarioConsultum { get; set; }
}
