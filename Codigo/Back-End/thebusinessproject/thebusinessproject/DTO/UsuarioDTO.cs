namespace thebusinessproject.DTO
{
    /// <summary>
    /// Representa un objeto de transferencia de datos para la entidad Usuario.
    /// </summary>
    public class UsuarioDTO
    {
        /// <summary>
        /// Es el correo del usuario.
        /// </summary>
        public string Correo { get; set; }
        /// <summary>
        /// Es la fecha en la que se creo en la db este usuario.
        /// </summary>
        public DateTime Fecha { get; set; }
    }
}
