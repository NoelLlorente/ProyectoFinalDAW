namespace thebusinessproject.DTO
{
    /// <summary>
    /// Representa un objeto de transferencia de datos para la entidad ResultadoConsultum.
    /// </summary>
    public class ResultadoConsultaDTO
    {
        /// <summary>
        /// Es el id autoincremental que se asigna cuando se crea un resultado para una consulta en la db.
        /// </summary>
        public int? IdresultadoConsulta { get; set; }
        /// <summary>
        /// Es la descripción que se obtiene de una consulta osea una ia generará un resultado que será un texto pues ese texto será el resultado.
        /// </summary>
        public string Resultado { get; set; } = null!;
        /// <summary>
        /// Es el id de la consulta, osea cada resultado pertenece a una consulta.
        /// </summary>
        public int Idconsulta { get; set; }
    }
}
