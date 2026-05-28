namespace Backend.Models
{
    public class Ads
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string ImageUrl { get; set; }

        public string TargetUrl { get; set; }

        public string Position { get; set; }

        public bool IsActive { get; set; } = true;

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }
    }
}