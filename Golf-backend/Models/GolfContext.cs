using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Golf.Models;

public partial class GolfContext : DbContext
{
    public GolfContext()
    {
    }

    public GolfContext(DbContextOptions<GolfContext> options): base(options)
    {
    }

  
    //public virtual DbSet<Payment_history> Payment_history { get; set; }
    public virtual DbSet<Place> Place { get; set; }
    public virtual DbSet<Reservation> Reservation { get; set; }
    public virtual DbSet<Role> Role { get; set; }
    public virtual DbSet<User> User { get; set; }
   // public virtual DbSet<UserWithReservation> UserWithReservation { get; set; }
    public virtual DbSet<PaymentHistory> PaymentHistory { get; set; }
    /*
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    => optionsBuilder.UseSqlServer("Data Source=localhost;Initial Catalog=Golf;User Id=sa;Password=Slunicko108;TrustServerCertificate=True;Encrypt=False;");
   */


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        /*
        modelBuilder.Entity<Payment_history>()
              .Property(e => e.payment_number)
              .IsUnicode(false);
        */
        //modelBuilder.Entity<Payment_history>()
        //    .HasMany(e => e.User)
        //    .WithOptional(e => e.Payment_history)
        //    .HasForeignKey(e => e.payment_history_id);

        modelBuilder.Entity<Place>()
            .Property(e => e.name)
            .IsUnicode(false);

        modelBuilder.Entity<Place>()
            .Property(e => e.adress)
            .IsUnicode(false);

        //modelBuilder.Entity<Place>()
        //    .HasMany(e => e.Reservation)
        //    .WithOptional(e => e.Place)
        //    .HasForeignKey(e => e.place_id);

        modelBuilder.Entity<Role>()
            .Property(e => e.role)
            .IsUnicode(false);

        modelBuilder.Entity<Role>()
            .Property(e => e.id).HasColumnName("roleId");
            

        //modelBuilder.Entity<Role>()
        //    .HasMany(e => e.User)
        //    .WithOptional(e => e.Role)
        //    .HasForeignKey(e => e.role_id);

        modelBuilder.Entity<User>()
            .Property(e => e.first_name)
            .IsUnicode(false);

        modelBuilder.Entity<User>()
            .Property(e => e.last_name)
            .IsUnicode(false);

        modelBuilder.Entity<User>()
            .Property(e => e.email)
            .IsUnicode(false);

        modelBuilder.Entity<User>()
            .Property(e => e.password)
            .IsUnicode(false);

        modelBuilder.Entity<User>()
            .Property(e => e.adress)
            .IsUnicode(false);

        modelBuilder.Entity<User>()
            .Property(e => e.zip)
            .IsUnicode(false);

        modelBuilder.Entity<User>()
            .Property(e => e.city)
            .IsUnicode(false);

        //modelBuilder.Entity<User>()
        //    .HasMany(e => e.Reservation)
        //    .WithOptional(e => e.User)
        //    .HasForeignKey(e => e.user_id);
        /*
        modelBuilder.Entity<Reservation>(entity =>
        {
            entity.ToTable("Reservation");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.CreateDate)
                .HasColumnType("datetime")
                .HasColumnName("create_date");
            entity.Property(e => e.CreditCost).HasColumnName("credit_cost");
            entity.Property(e => e.From)
                .HasColumnType("datetime")
                .HasColumnName("from");
            entity.Property(e => e.To)
                .HasColumnType("datetime")
                .HasColumnName("to");
            entity.Property(e => e.UserId).HasColumnName("user_id");
            

           // entity.HasOne(d => d.User).WithMany(p => p.Reservations)
             //   .HasForeignKey(d => d.UserId)
            //    .OnDelete(DeleteBehavior.ClientSetNull)
            //    .HasConstraintName("FK_Reservation_User");
            
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.ToTable("User");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Adress)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("adress");
            entity.Property(e => e.City)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("city");
            entity.Property(e => e.Credit).HasColumnName("credit");
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.FirstName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("first_name");
            entity.Property(e => e.LastName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("last_name");
            entity.Property(e => e.Password)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("password");
            entity.Property(e => e.Tel)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("tel");
            entity.Property(e => e.Zip)
                .HasMaxLength(6)
                .IsUnicode(false)
                .HasColumnName("zip");
        });
        */

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
