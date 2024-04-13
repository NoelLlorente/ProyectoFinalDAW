using System;
using System.Collections.Generic;

namespace thebusinessproject.Entities;

public partial class Post
{
    public int Id { get; set; }

    public string Descripcion { get; set; } = null!;

    public DateTime Fecha { get; set; }

    public virtual UsuarioPost? UsuarioPost { get; set; }
}
