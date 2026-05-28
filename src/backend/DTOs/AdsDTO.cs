namespace Backend.DTOs
{
    public class AdsDTO
    {
        public string Title { get; set; }

        public string ImageUrl { get; set; }

        public string TargetUrl { get; set; }

        public string Position { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }
    }
}