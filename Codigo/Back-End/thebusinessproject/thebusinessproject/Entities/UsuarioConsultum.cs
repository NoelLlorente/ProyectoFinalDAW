using System;
using System.Collections.Generic;

namespace thebusinessproject.Entities;

public partial class UsuarioConsultum
{
    public string IdUsuario { get; set; } = null!;

    public int IdConsulta { get; set; }

    public virtual Consultum IdConsultaNavigation { get; set; } = null!;

    public virtual Usuario IdUsuarioNavigation { get; set; } = null!;
}
