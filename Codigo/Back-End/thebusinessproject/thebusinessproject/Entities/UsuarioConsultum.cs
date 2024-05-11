using System;
using System.Collections.Generic;

namespace thebusinessproject.Entities;

/// <summary>
/// Representa un conductor en la base de datos. Es una relación entre la tabla usuario y consulta.
/// </summary>
public partial class UsuarioConsultum
{
    /// <summary>
    /// Es el correo del usuario al que pertenece la consulta
    /// </summary>
    public string IdUsuario { get; set; } = null!;
    /// <summary>
    /// Es el id de la consulta.
    /// </summary>
    public int IdConsulta { get; set; }

    /// <summary>
    /// Navegación a la consulta asociada.
    /// </summary>
    public virtual Consultum IdConsultaNavigation { get; set; } = null!;
    /// <summary>
    /// Navegación al usuario asociado.
    /// </summary>
    public virtual Usuario IdUsuarioNavigation { get; set; } = null!;
}
