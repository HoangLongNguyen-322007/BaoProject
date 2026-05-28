namespace Backend.Models
{
    public class Reply
    {
        public int Id { get; set; }

        public string Content { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public int UserId { get; set; }

        public User User { get; set; }

        public int CommentId { get; set; }

        public Comment Comment { get; set; }
    }
}