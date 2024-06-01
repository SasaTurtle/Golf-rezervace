namespace Golf.Models
{
    public class ReservationRequest
    {
        public ReservationRequest()
        {
            this.from = String.Empty;
            this.to = String.Empty;
        }

        public String from { get; set; }
        public String to { get; set; }
       
    }
}
