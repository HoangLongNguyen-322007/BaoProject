 namespace Backend.Models
{
    public class Comment
    {
        public int Id { get; set; }

        public string Content { get; set; }

        public bool IsEdited { get; set; } = false;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public int UserId { get; set; }

        public User User { get; set; }

        public int ArticleId { get; set; }

        public Article Article { get; set; }

        public ICollection<Reply> Replies { get; set; }
    }
}