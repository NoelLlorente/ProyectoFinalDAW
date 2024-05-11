using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace thebusinessproject.Entities;

/// <summary>
/// Clase parcial que representa el contexto de la base de datos para el proyecto de negocio.
/// </summary>
public partial class ThebusinessjourneyContext : DbContext
{
    /// <summary>
    /// Constructor por defecto.
    /// </summary>
    public ThebusinessjourneyContext()
    {
    }

    /// <summary>
    /// Constructor que acepta opciones para la configuración del contexto de la base de datos.
    /// </summary>
    public ThebusinessjourneyContext(DbContextOptions<ThebusinessjourneyContext> options)
        : base(options)
    {
    }
    /// <summary>
    /// Representa la tabla 'consulta' en la base de datos.
    /// </summary>
    public virtual DbSet<Consultum> Consulta { get; set; }
    /// <summary>
    /// Representa la tabla 'post' en la base de datos.
    /// </summary>
    public virtual DbSet<Post> Posts { get; set; }
    /// <summary>
    /// Representa la tabla 'resultado_consulta' en la base de datos.
    /// </summary>
    public virtual DbSet<ResultadoConsultum> ResultadoConsulta { get; set; }
    /// <summary>
    /// Representa la tabla 'usuario' en la base de datos.
    /// </summary>
    public virtual DbSet<Usuario> Usuarios { get; set; }
    /// <summary>
    /// Representa la tabla 'usuario_consulta' en la base de datos.
    /// </summary>
    public virtual DbSet<UsuarioConsultum> UsuarioConsulta { get; set; }
    /// <summary>
    /// Representa la tabla 'usuario_post' en la base de datos.
    /// </summary>
    public virtual DbSet<UsuarioPost> UsuarioPosts { get; set; }

    /// <summary>
    /// Método para configurar el contexto de la base de datos.
    /// </summary>
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySQL("server=localhost;user=root;password=root;database=thebusinessjourney;");

    /// <summary>
    /// Método para configurar el modelo de la base de datos.
    /// </summary>
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Consultum>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("consulta");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Descripcion)
                .HasMaxLength(255)
                .HasColumnName("descripcion");
            entity.Property(e => e.Fecha)
                .HasColumnType("datetime")
                .HasColumnName("fecha");
            entity.Property(e => e.Presupuesto)
                .HasPrecision(10)
                .HasColumnName("presupuesto");
            entity.Property(e => e.Tipo)
                .HasMaxLength(10)
                .HasColumnName("tipo");
        });

        modelBuilder.Entity<Post>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("post");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Descripcion)
                .HasMaxLength(10000)
                .HasColumnName("descripcion");
            entity.Property(e => e.Fecha)
                .HasColumnType("datetime")
                .HasColumnName("fecha");
        });

        modelBuilder.Entity<ResultadoConsultum>(entity =>
        {
            entity.HasKey(e => e.IdresultadoConsulta).HasName("PRIMARY");

            entity.ToTable("resultado_consulta");

            entity.HasIndex(e => e.Idconsulta, "consulta_idx");

            entity.HasIndex(e => e.Idconsulta, "idconsulta_UNIQUE").IsUnique();

            entity.Property(e => e.IdresultadoConsulta).HasColumnName("idresultado_consulta");
            entity.Property(e => e.Idconsulta).HasColumnName("idconsulta");
            entity.Property(e => e.Resultado)
                .HasMaxLength(5000)
                .HasColumnName("resultado");

            entity.HasOne(d => d.IdconsultaNavigation).WithOne(p => p.ResultadoConsultum)
                .HasForeignKey<ResultadoConsultum>(d => d.Idconsulta)
                .HasConstraintName("consulta");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.Correo).HasName("PRIMARY");

            entity.ToTable("usuario");

            entity.HasIndex(e => e.Correo, "correo_UNIQUE").IsUnique();

            entity.Property(e => e.Correo)
                .HasMaxLength(50)
                .HasColumnName("correo");
            entity.Property(e => e.Fecha)
                .HasColumnType("datetime")
                .HasColumnName("fecha");
        });

        modelBuilder.Entity<UsuarioConsultum>(entity =>
        {
            entity.HasKey(e => e.IdConsulta).HasName("PRIMARY");

            entity.ToTable("usuario_consulta");

            entity.HasIndex(e => e.IdConsulta, "id_consulta_UNIQUE").IsUnique();

            entity.HasIndex(e => e.IdUsuario, "id_usuario_idx");

            entity.Property(e => e.IdConsulta).HasColumnName("id_consulta");
            entity.Property(e => e.IdUsuario)
                .HasMaxLength(50)
                .HasColumnName("id_usuario");

            entity.HasOne(d => d.IdConsultaNavigation).WithOne(p => p.UsuarioConsultum)
                .HasForeignKey<UsuarioConsultum>(d => d.IdConsulta)
                .HasConstraintName("id_consulta");

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.UsuarioConsulta)
                .HasForeignKey(d => d.IdUsuario)
                .HasConstraintName("id_usuario");
        });

        modelBuilder.Entity<UsuarioPost>(entity =>
        {
            entity.HasKey(e => e.IdPost).HasName("PRIMARY");

            entity.ToTable("usuario_post");

            entity.HasIndex(e => e.IdPost, "id_post_UNIQUE").IsUnique();

            entity.HasIndex(e => e.IdUsuario, "usuarioid_idx");

            entity.Property(e => e.IdPost).HasColumnName("id_post");
            entity.Property(e => e.IdUsuario)
                .HasMaxLength(50)
                .HasColumnName("id_usuario");

            entity.HasOne(d => d.IdPostNavigation).WithOne(p => p.UsuarioPost)
                .HasForeignKey<UsuarioPost>(d => d.IdPost)
                .HasConstraintName("postid");

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.UsuarioPosts)
                .HasForeignKey(d => d.IdUsuario)
                .HasConstraintName("usuarioid");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    /// <summary>
    /// Método parcial para configurar el modelo de la base de datos.
    /// </summary>
    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
