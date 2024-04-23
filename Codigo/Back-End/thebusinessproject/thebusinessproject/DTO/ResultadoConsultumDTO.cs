namespace thebusinessproject.DTO
{
    public class ResultadoConsultumDTO
    {
        public int? IdresultadoConsulta { get; set; }

        public string Pasos { get; set; } = null!;

        public string PresupuestoEstimado { get; set; } = null!;

        public string Probabilidad { get; set; } = null!;

        public int Idconsulta { get; set; }
    }
}
