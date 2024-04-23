namespace thebusinessproject.DTO
{
    public class ConsultumDTO
    {
        public int? Id { get; set; }

        public string Descripcion { get; set; } = null!;

        public decimal Presupuesto { get; set; }

        public string Tipo { get; set; }

        public DateTime Fecha { get; set; }

        public List<ResultadoConsultumDTO>? ResultadoConsultum { get; set; }
    }
}
