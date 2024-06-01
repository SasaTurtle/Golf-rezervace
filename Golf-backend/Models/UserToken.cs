using System.ComponentModel.DataAnnotations;

namespace Golf.Models
{
    public class UserToken
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public UserToken(int userid, string email)
        {
           this.email = email;
           this.id = userid;
        }

        public int id { get; set; }

        public string email { get; set; }


    }
}
