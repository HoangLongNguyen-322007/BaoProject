namespace Backend.Models
{
    public class Article
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Slug { get; set; }

        public string Summary { get; set; }

        public string Content { get; set; }

        public string Thumbnail { get; set; }

        public string Status { get; set; }

        public int ViewCount { get; set; } = 0;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedAt { get; set; }

        public DateTime? PublishedAt { get; set; }

        public int AuthorId { get; set; }

        public User Author { get; set; }

        public int CategoryId { get; set; }

        public Category Category { get; set; }

        public ICollection<Comment> Comments { get; set; }

        public ICollection<Bookmark> Bookmarks { get; set; }

        public ICollection<Video> Videos { get; set; }
    }
}