namespace Backend.Models
{
    public class User
    {
        public int Id { get; set; }

        public string Username { get; set; }

        public string Email { get; set; }

        public string PasswordHash { get; set; }

        public string Avatar { get; set; }

        public string Bio { get; set; }

        public bool IsActive { get; set; } = true;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedAt { get; set; }

        public int RoleId { get; set; }

        public Role Role { get; set; }

        public ICollection<Article> Articles { get; set; }

        public ICollection<Comment> Comments { get; set; }

        public ICollection<Reply> Replies { get; set; }

        public ICollection<Bookmark> Bookmarks { get; set; }

        public ICollection<Notification> Notifications { get; set; }
    }
}