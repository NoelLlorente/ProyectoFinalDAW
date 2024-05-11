using System;
using System.Collections.Generic;

namespace thebusinessproject.Entities;

/// <summary>
/// Representa un conductor en la base de datos.
/// </summary>
public partial class Post
{
    /// <summary>
    /// Es el id del post, este es autoincremental.
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Es la descripción del post
    /// </summary>
    public string Descripcion { get; set; } = null!;

    /// <summary>
    /// Es la fecha de creación del post
    /// </summary>
    public DateTime Fecha { get; set; }

    /// <summary>
    /// Es una referencia a la tabla de la db usuario_post, esto porque un usuario puede tener uno o varios posts.
    /// </summary>
    public virtual UsuarioPost? UsuarioPost { get; set; }
}
