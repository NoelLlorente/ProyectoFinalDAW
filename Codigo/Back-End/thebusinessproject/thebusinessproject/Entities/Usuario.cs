using System;
using System.Collections.Generic;

namespace thebusinessproject.Entities;

/// <summary>
/// Representa un conductor en la base de datos.
/// </summary>
public partial class Usuario
{
    /// <summary>
    /// Es el campo primario en la db, es el correo del usuario
    /// </summary>
    public string Correo { get; set; } = null!;

    /// <summary>
    /// Es la fecha de creación de este usuario.
    /// </summary>
    public DateTime Fecha { get; set; }

    /// <summary>
    /// Es una referencia a la tabla de la db usuario_consulta que contiene el correo e id de la consulta.
    /// </summary>
    public virtual ICollection<UsuarioConsultum> UsuarioConsulta { get; set; } = new List<UsuarioConsultum>();
    /// <summary>
    /// Es una referencia a la tabla de la db usuario_post que contiene el correo del usuario y el id del post.
    /// </summary>
    public virtual ICollection<UsuarioPost> UsuarioPosts { get; set; } = new List<UsuarioPost>();
}
