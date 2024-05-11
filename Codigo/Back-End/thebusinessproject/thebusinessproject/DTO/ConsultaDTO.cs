namespace thebusinessproject.DTO
{
    /// <summary>
    /// Representa un objeto de transeferencia de datos para la entidad Consultum.
    /// </summary>
    public class ConsultaDTO
    {
        /// <summary>
        /// Es el id de la consulta
        /// </summary>
        public int? Id { get; set; }

        /// <summary>
        /// Es la descripción de la consulta
        /// </summary>
        public string Descripcion { get; set; } = null!;
        /// <summary>
        /// Es el presupuesto, un numero decimal de la consulta.
        /// </summary>
        public decimal Presupuesto { get; set; }
        /// <summary>
        /// Es el tipo de consulta, hay dos tipos online y físico.
        /// </summary>
        public string Tipo { get; set; }
        /// <summary>
        /// Es la fecha en la que se realizo la consulta.
        /// </summary>
        public DateTime Fecha { get; set; }
        /// <summary>
        /// Es una referencia al DTO ResultadoConsultaDTO porque cada consulta tiene su resultado, y resultado es un objeto con varios campos. 
        /// </summary>
        public ResultadoConsultaDTO? ResultadoConsulta { get; set; }
    }
}
