namespace Golf.Models
{
    public class ReservationResponse
    {
        public ReservationResponse(string title, string from, string to, string color, int publicId)
        {
            this.title = title;
            this.start = from;
            this.end = to;
            this.color = color;
            this.publicId = publicId;
        }

        public String title { get; set; }
        public String start { get; set; }
        public String end { get; set; }
        public String color { get; set; }
        public int publicId { get; set; }


    }
}