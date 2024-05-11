namespace thebusinessproject.DTO
{
    /// <summary>
    /// Representa un objeto de transferencia de datos para la entidad Post.
    /// </summary>
    public class PostDTO
    {
        /// <summary>
        /// Es el id del post
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
        /// Es el correo del usuario que creo el post.
        /// </summary>
        public string? Usuario { get; set; }
    }
}
