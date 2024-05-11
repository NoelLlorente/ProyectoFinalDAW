using System;
using System.Collections.Generic;

namespace thebusinessproject.Entities;

/// <summary>
/// Representa un conductor en la base de datos. Representa una relación entre un usuario y un post en la base de datos.
/// </summary>
public partial class UsuarioPost
{
    /// <summary>
    /// Es el correo del usuario.
    /// </summary>
    public string IdUsuario { get; set; } = null!;
    /// <summary>
    /// Es el id del post asociado.
    /// </summary>
    public int IdPost { get; set; }

    /// <summary>
    /// Navegación al post asociado.
    /// </summary>
    public virtual Post IdPostNavigation { get; set; } = null!;

    /// <summary>
    /// Navegación al usuario asociado.
    /// </summary>
    public virtual Usuario IdUsuarioNavigation { get; set; } = null!;
}
