namespace Golf.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    // using System.Data.Entity.Spatial;

    [Table("Payment_history")]
    public partial class PaymentHistory
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public PaymentHistory()
        {
           // User = new HashSet<User>();
        }

        public int id { get; set; }

        public int user_id { get; set; }

        public double? CZK { get; set; }

        public int? credit { get; set; }

        [StringLength(100)]
        public string? payment_number { get; set; }

        public DateTime? date { get; set; }

        //[System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        //public virtual ICollection<User> User { get; set; }
    }
}
