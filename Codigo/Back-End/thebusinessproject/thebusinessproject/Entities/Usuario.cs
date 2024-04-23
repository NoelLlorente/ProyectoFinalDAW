using System;
using System.Collections.Generic;

namespace thebusinessproject.Entities;

public partial class Usuario
{
    public string Correo { get; set; } = null!;

    public DateTime Fecha { get; set; }

    public virtual ICollection<UsuarioConsultum> UsuarioConsulta { get; set; } = new List<UsuarioConsultum>();

    public virtual ICollection<UsuarioPost> UsuarioPosts { get; set; } = new List<UsuarioPost>();
}
