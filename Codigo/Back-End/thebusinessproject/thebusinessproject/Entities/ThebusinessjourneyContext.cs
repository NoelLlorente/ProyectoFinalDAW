using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace thebusinessproject.Entities;

public partial class ThebusinessjourneyContext : DbContext
{
    public ThebusinessjourneyContext()
    {
    }

    public ThebusinessjourneyContext(DbContextOptions<ThebusinessjourneyContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Consultum> Consulta { get; set; }

    public virtual DbSet<Post> Posts { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    public virtual DbSet<UsuarioConsultum> UsuarioConsulta { get; set; }

    public virtual DbSet<UsuarioPost> UsuarioPosts { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySQL("server=localhost;user=root;password=root;database=thebusinessjourney;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Consultum>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("consulta");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Descripcion)
                .HasMaxLength(10000)
                .HasColumnName("descripcion");
            entity.Property(e => e.Fecha)
                .HasColumnType("datetime")
                .HasColumnName("fecha");
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

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.Correo).HasName("PRIMARY");

            entity.ToTable("usuario");

            entity.HasIndex(e => e.Correo, "correo_UNIQUE").IsUnique();

            entity.Property(e => e.Correo)
                .HasMaxLength(50)
                .HasColumnName("correo");
            entity.Property(e => e.Contraseña)
                .HasMaxLength(100)
                .HasColumnName("contraseña");
            entity.Property(e => e.Fecha)
                .HasColumnType("datetime")
                .HasColumnName("fecha");
            entity.Property(e => e.Nombre)
                .HasMaxLength(80)
                .HasColumnName("nombre");
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

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
