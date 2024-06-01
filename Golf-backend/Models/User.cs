namespace Golf.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    //using System.Data.Entity.Spatial;

    [Table("User")]
    public partial class User
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public User()
        {
            //Reservation = new HashSet<Reservation>();
        }

        public int id { get; set; }

        public int roleId { get; set; }


        [StringLength(50)]
        public string first_name { get; set; }

        [StringLength(50)]
        public string last_name { get; set; }

        [StringLength(100)]
        public string email { get; set; }

        [StringLength(30)]
        public string password { get; set; }

        [StringLength(100)]
        public string adress { get; set; }

        [StringLength(10)]
        public string zip { get; set; }

        [StringLength(50)]
        public string city { get; set; }

        public int? credit { get; set; }

        public bool? isverified { get; set; }

        //[System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        //public virtual ICollection<Reservation> Reservation { get; set; }

        //public virtual Role RoleId { get; set; }
    }
}
