using System;
using System.Collections.Generic;

namespace thebusinessproject.Entities;

public partial class UsuarioPost
{
    public string IdUsuario { get; set; } = null!;

    public int IdPost { get; set; }

    public virtual Post IdPostNavigation { get; set; } = null!;

    public virtual Usuario IdUsuarioNavigation { get; set; } = null!;
}
