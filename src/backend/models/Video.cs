namespace Backend.Models
{
    public class Video
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string VideoUrl { get; set; }

        public string Thumbnail { get; set; }

        public DateTime UploadedAt { get; set; } = DateTime.UtcNow;

        public int ArticleId { get; set; }

        public Article Article { get; set; }
    }
}