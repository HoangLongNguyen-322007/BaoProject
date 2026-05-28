namespace Backend.Models
{
    public class Bookmark
    {
        public int Id { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public int UserId { get; set; }

        public User User { get; set; }

        public int ArticleId { get; set; }

        public Article Article { get; set; }
    }
}