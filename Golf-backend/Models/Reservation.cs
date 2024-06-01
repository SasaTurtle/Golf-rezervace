namespace Golf.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
   // using System.Data.Entity.Spatial;

    [Table("Reservation")]
    public partial class Reservation
    {
        public int id { get; set; }

        public int? user_id { get; set; }

        public int? place_id { get; set; }

        public DateTime? from { get; set; }

        public DateTime? to { get; set; }

        public string? title { get; set; }
    }
}
